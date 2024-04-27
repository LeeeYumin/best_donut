getTodayIns();

//생산지시 진행상태
class InsStatus {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        this.el.innerText = instructStatus(props.formattedValue);
    }
    getElement() {
        return this.el;
    }
}

function instructStatus(value) {
    let result;
    if (value == "IS1") {
        result = "지시완료";
    } else if (value == "IS2") {
        result = "생산중";
    } else if (value == "IS3") {
        result = "생산완료";
    }
    return result;
}

const prodInsList = new tui.Grid({
    el: document.getElementById('prodInsList'),
    scrollX: false,
    scrollY: false,
    bodyHeight: 160,
    columns: [
        {
            header: '생산지시일자',
            name: 'instructDate',
            align: 'center'
        },
        {
            header: '생산지시코드',
            name: 'prodInstructCode',
            align: 'center'
        },
        {
            header: '지시상태',
            name: 'prodInstructStatus',
            align: 'center',
            renderer: { type: InsStatus }
        },
        {
            header: '담당자',
            name: 'usersCode',
            align: 'center'
        }
    ]
});
/* < 당일 생산지시 상세 > */
const prodInsDetail = new tui.Grid({
    el: document.getElementById('prodInsDetail'),
    scrollX: false,
    scrollY: false,
    columns: [
        {
            header: '생산지시상세코드',
            name: 'prodInstructDetailCode',
            align: 'center'
        },
        {
            header: '제품코드',
            name: 'productCode',
            align: 'center'
        },
        {
            header: '제품명',
            name: 'productName',
            align: 'center'
        },
        {
            header: '지시수량',
            name: 'instructCnt',
            align: 'center'
        },
        {
            header: '자재 불출 유무',
            name: 'matOutgoingStatus',
            align: 'center',
        },
    ]
});

// 당일 생산지시 조회
async function getTodayIns() {
    await fetch("/ajax/todayProdIns")
        .then(res => res.json())
        .then(res => {
            console.log(res);

            prodInsList.resetData(res.prodIns); //ServiceImpl에서 넘겨 준 변수명
            prodInsDetail.resetData(res.prodInsDe);
        })
};

// 생산 지시 클릭 시 자재 불출 유무 체크
prodInsDetail.on('click', () => {
    let matOutgoingStatus = prodInsDetail.getValue(prodInsDetail.getFocusedCell().rowKey, 'matOutgoingStatus')

    if (matOutgoingStatus == 'O') {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: '이미 불출한 생산 지시입니다.',
            text: ' ',
            showConfirmButton: false,
            timer: 1500
        });

        BOMList.resetData([]);
        matStockList.resetData([]);
        matOutgoingList.resetData([]);
    } else if (matOutgoingList.getData().length != 0) {
        let productCode = BOMList.getData()[0].productCode;
        let prodInsDetailData = prodInsDetail.getData();

        Swal.fire({
            position: "center",
            icon: "warning",
            title: '불출 목록에 자재들이 담겨있습니다.',
            text: '불출 먼저 해주세요.',
            showConfirmButton: false,
            timer: 1500
        });

        for (let i = 0; i < prodInsDetailData.length; i++) {
            if (prodInsDetailData[i].productCode == productCode) {
                prodInsDetail.focusAt(i, 2);
                break;
            }
        }

    } else {
        getBOMList();
        matStockList.resetData([]);
    }
});

// BOM 테이블
const BOMList = new tui.Grid({
    el: document.getElementById('BOMList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 240,
    columns: [
        {
            header: 'BOM 코드',
            name: 'bomCode',
            align: 'center',
            rowSpan: true
        },
        {
            header: '제품명',
            name: 'productName',
            rowSpan: true,
            hidden: true,
        },
        {
            header: '제품명',
            name: 'productName',
            align: 'center',
            rowSpan: true
        },
        {
            header: '자재코드',
            name: 'matCode',
            align: 'center',
        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
        },
        {
            header: 'BOM 소요량',
            name: 'needCnt',
            align: 'end',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
        },
        {
            header: '단위',
            name: 'unit',
            width: 50,
        },
        {
            header: '생산 소요량',
            name: 'procNeedCnt',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
        },
        {
            header: '단위',
            name: 'matUnit',
            width: 50,
        },
    ]
});

// BOM 목록 ajax
async function getBOMList() {
    let productCode = prodInsDetail.getValue(prodInsDetail.getFocusedCell().rowKey, 'productCode');

    await fetch("/ajax/bomoutlist?productCode=" + productCode)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            BOMList.resetData(res);
        })

    requireMatCal();
};

// 자재 소요량 계산
function requireMatCal() {
    let instructCnt = prodInsDetail.getValue(prodInsDetail.getFocusedCell().rowKey, 'instructCnt');
    let BOMListData = BOMList.getData();

    // 자재
    for (let i = 0; i < BOMListData.length; i++) {
        let needCnt = BOMListData[i].needCnt;

        if (BOMListData[i].matCode == 'MAT00002') {
            BOMList.setValue(i, 'procNeedCnt', needCnt * instructCnt / 60);
        } else if (BOMListData[i].matCode == 'MAT00009') {
            BOMList.setValue(i, 'procNeedCnt', needCnt * instructCnt);
        } else {
            BOMList.setValue(i, 'procNeedCnt', needCnt * instructCnt / 1000);
        }

    }
}

// BOM 목록 클릭시 LOT별 자재 목록 출력
BOMList.on('click', () => {
    getMaterialDetailsList();
});

// 자재 상태
class MatStatusConverter {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        if (props.formattedValue == 'MSC') {
            this.el.innerText = '소진';
        } else if (props.formattedValue == 'MSN') {
            this.el.innerText = '폐기';
        } else {
            this.el.innerText = '정상';
        }
    }
    getElement() {
        return this.el;
    }
}

// 자재 재고 테이블
const matStockList = new tui.Grid({
    el: document.getElementById('matStockList'),
    scrollX: false,
    scrollY: true,
    rowHeaders: ['checkbox'],
    columns: [
        {
            header: 'LOT',
            name: 'matLotCode',
            align: 'center',
        },
        {
            header: '자재코드',
            name: 'matCode',
            align: 'center'
        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
        },
        {
            header: '현재고량',
            name: 'remainCnt',
            align: 'center',
            defaultValue: 0
        },
        {
            header: '단위',
            name: 'matUnit',
            width: 50,
        },
        {
            header: '유통기한',
            name: 'expDate',
            align: 'center'
        },
        {
            header: '자재상태',
            name: 'matStatus',
            align: 'center',
            renderer: { type: MatStatusConverter }
        }
    ]
});

// 상세 로트 조회(ajax)
function getMaterialDetailsList() {
    let matCode = BOMList.getValue(BOMList.getFocusedCell().rowKey, 'matCode');

    fetch("/ajax/materiallots?matCode=" + matCode)
        .then(res => res.json())
        .then(res => {
            // ajax로 불러온 데이터 그리드에 넣음
            matStockList.resetData(res);
            console.log(res);
        })
};

// 자재 불출 테이블 행 추가
matStockList.on('checkAll', function () {
    let prodInstructDetailCode = prodInsDetail.getValue(prodInsDetail.getFocusedCell().rowKey, 'prodInstructDetailCode');
    let checked = matStockList.getCheckedRows();
    let procNeedCnt = BOMList.getValue(BOMList.getFocusedCell().rowKey, 'procNeedCnt');
    let appendData = [];

    for (let i = 0; i < checked.length; i++) {
        let remainCnt = checked[i].remainCnt;

        if (remainCnt < procNeedCnt) {
            const { matLotCode, matCode, matName, matUnit } = checked[i];
            appendData.push({ matLotCode, matCode, matName, procNeedCnt: remainCnt, matUnit, prodInstructDetailCode, _attributes: { checked: true } });
            procNeedCnt -= remainCnt;
        } else {
            const { matLotCode, matCode, matName, matUnit } = checked[i];
            appendData.push({ matLotCode, matCode, matName, procNeedCnt, matUnit, prodInstructDetailCode, _attributes: { checked: true } });
            break;
        }
    }

    matOutgoingList.appendRows(appendData);

    // 추가된 자재만 체크 표시
    let matOutgoingListData = matOutgoingList.getData();
    for (let i = 0; i < matOutgoingListData.length; i++) {
        for (let j = 0; j < checked.length; j++) {
            if (matOutgoingListData[i].matLotCode == checked[j].matLotCode) {
                matStockList.check(j)
            }else{
                matStockList.uncheck(j)
            }
        }
    }
});
// 자재 재고 테이블 모두 선택 해제 시 불출 테이블에서도 데이터 삭제
matStockList.on('uncheckAll', function () {
    let data = matOutgoingList.getData();
    let uncheckMatLotCodes = [];

    // 체크 해제된 자재 로트 코드 담기
    for (let i = 0; i < matStockList.getData().length; i++) {
        uncheckMatLotCodes.push(matStockList.getValue(i, 'matLotCode'));
    }

    // 새로운 배열에 삭제 로트 제외한 데이터 담기
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        if (uncheckMatLotCodes.indexOf(data[i].matLotCode) < 0) {
            newData.push(data[i])
        }
    }
    matOutgoingList.resetData(newData);
});

// 체크한 자재 재고 테이블 데이터 불출 테이블에 추가
matStockList.on('check', function (ev) {
    let checked = matStockList.getRow(ev.rowKey);
    let procNeedCnt = BOMList.getValue(BOMList.getFocusedCell().rowKey, 'procNeedCnt');
    let matOutgoingListData = matOutgoingList.getData();
    let alreadyCnt = 0;

    // 이미 추가된 자재 수량 구하기
    for (let i = 0; i < matOutgoingListData.length; i++) {
        if (matOutgoingListData[i].matCode == checked.matCode) {
            alreadyCnt += matOutgoingListData[i].procNeedCnt
        }
    }
    procNeedCnt -= alreadyCnt;

    let prodInstructDetailCode = prodInsDetail.getValue(prodInsDetail.getFocusedCell().rowKey, 'prodInstructDetailCode');
    const { matLotCode, matCode, remainCnt, matName, matUnit } = checked;

    if (checked.remainCnt == null || checked.remainCnt == 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: '선택하신 자재의 재고가 없습니다.',
            text: ' ',
            showConfirmButton: false,
            timer: 1500
        });
        matStockList.uncheck(ev.rowKey);
    } else if (checked.remainCnt < procNeedCnt) {
        matOutgoingList.appendRow({ matLotCode, matCode, matName, procNeedCnt: remainCnt, matUnit, prodInstructDetailCode, _attributes: { checked: true } });
    } else {
        matOutgoingList.appendRow({ matLotCode, matCode, matName, procNeedCnt, matUnit, prodInstructDetailCode, _attributes: { checked: true } })
    }
});

// 체크 해제한 자재 불출 테이블에서 삭제
matStockList.on('uncheck', function (ev) {
    let uncheckMatLotCode = matStockList.getValue(ev.rowKey, 'matLotCode')
    let data = matOutgoingList.getData()

    // 새로운 배열에 삭제 로트 제외한 데이터 담기
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        if (uncheckMatLotCode.indexOf(data[i].matLotCode) < 0) {
            newData.push(data[i])
        }
    }
    matOutgoingList.resetData(newData);
});

// 자재 불출 테이블
const matOutgoingList = new tui.Grid({
    el: document.getElementById('matOutgoingList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 240,
    rowHeaders: ['checkbox'],
    columns: [
        {
            header: 'LOT',
            name: 'matLotCode',
            align: 'center',
            sortable: true
        },
        {
            header: '자재코드',
            name: 'matCode',
            align: 'center'
        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
            sortable: true,
        },
        {
            header: '불출수량',
            name: 'procNeedCnt',
            align: 'center',
            editor: {
                type: 'text'
            }
        },
        {
            header: '단위',
            name: 'matUnit',
            width: 50,
        },
        {
            header: '지시상세코드',
            name: 'prodInstructDetailCode',
            width: 50,
            hidden: true
        },
    ]
});

// 불출 버튼 클릭 이벤트 
document.getElementById('outgoingBtn').addEventListener('click', checkValidation);

function checkValidation() {
    matOutgoingList.blur();

    let matOutgoingListData = matOutgoingList.getData();
    let BOMListData = BOMList.getData();
    let result = 1;

    // 불출 유무 체크


    // 불출 수량 체크
    for (let i = 0; i < matOutgoingListData.length; i++) {
        // 불출 수량이 빈값이거나 0인 자재 체크
        if (Number(matOutgoingListData[i].procNeedCnt) == 0) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: matOutgoingListData[i].matName + ' 수량을 확인해주세요.',
                text: ' ',
                showConfirmButton: false,
                timer: 1500
            });
            matOutgoingList.focusAt(i, 3);
            result = 0;
            break;

            // 불출 수량이 숫자인지 체크
        } else if (isNaN(Number(matOutgoingListData[i].procNeedCnt))) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: matOutgoingListData[i].matName + ' 수량을 숫자로 입력해주세요',
                text: ' ',
                showConfirmButton: false,
                timer: 1500
            });
            matOrderList.focusAt(i, 3);
            result = 0;
            break;
        }
    }

    // 모든 자재를 넣었는지 체크
    for (let i = 0; i < BOMListData.length; i++) {
        let matCode = BOMListData[i].matCode

        let insertOk = false;

        for (let j = 0; j < matOutgoingListData.length; j++) {
            if (matOutgoingListData[j].matCode == matCode) {
                insertOk = true;
            }
        }

        if (insertOk == false) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: BOMListData[i].matName + '을 추가해주세요.',
                text: ' ',
                showConfirmButton: false,
                timer: 1500
            });
            result = 0;
            break;
        }
    }

    // validation 통과
    if (result) {
        insertMatOutgoing();
    }
}

// 삭제 버튼 이벤트
document.getElementById('delBtn').addEventListener('click', () => {
    let checkedRowKeys = matOutgoingList.getCheckedRowKeys();
    matOutgoingList.removeRows(checkedRowKeys);
})

// 불출 등록
async function insertMatOutgoing() {
    let materialOutgoingVO = matOutgoingList.getData();

    const param = materialOutgoingVO;

    let result = 0;

    await fetch('/ajax/matOutgoingInsert', {
        method: 'post',
        headers: jsonHeaders,
        body: JSON.stringify(param)
    })
        .then(res => res.json())
        .then(res => {
            result = res;
            console.log(result);
        })

    if (result) {
        matOutgoingList.resetData([]);
        matStockList.resetData([]);
        getTodayIns();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "불출 완료!",
            text: "불출이 정상적으로 처리되었습니다.",
            showConfirmButton: false,
            timer: 1500
        });

    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "불출 실패",
            text: "불출이 정상적으로 처리되지 않았습니다.",
            showConfirmButton: false,
            timer: 1500
        });
    }

}