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
            header: '미생산수량',
            name: 'notProdCnt',
            align: 'center'
        },
        {
            header: '생산수량',
            name: 'prodCnt',
            align: 'center'
        },
        {
            header: '공정상태', //수정하기
            name: 'procStatus',
            align: 'center'
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

prodInsDetail.on('click', () => {
    getBOMList();
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

        if(BOMListData[i].matCode == 'MAT00002'){
            BOMList.setValue(i, 'procNeedCnt', needCnt * instructCnt / 60 );
        }else if(BOMListData[i].matCode == 'MAT00009'){
            BOMList.setValue(i, 'procNeedCnt', needCnt * instructCnt );
        }else{
            BOMList.setValue(i, 'procNeedCnt', needCnt * instructCnt / 1000 );
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
    scrollY: false,
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
            header: '현재고량',
            name: 'remainCnt',
            align: 'center',
            defaultValue: 0
        },
        {
            header: '단위',
            name: 'unit',
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
async function getMaterialDetailsList() {
    let matCode = BOMList.getValue(BOMList.getFocusedCell().rowKey,'matCode');

    await fetch("/ajax/materiallots?matCode=" + matCode)
        .then(res => res.json())
        .then(res => {
            // ajax로 불러온 데이터 그리드에 넣음
            matStockList.resetData(res);
            console.log(res);
        })
};

document.getElementById('outgoingBtn').addEventListener('click', () => {
    prodInstructDetailCode = prodInsDetail.getValue(prodInsDetail.getFocusedCell().rowKey, 'prodInstructDetailCode');

    console.log(prodInstructDetailCode);
})