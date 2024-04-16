getProdPlanList();
getMaterialsList();
getBOMList();

//생산계획 진행상태
class PlanStatus {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        this.el.innerText = props.formattedValue == 'LS1' ? '미지시' : '지시등록';
    }
    getElement() {
        return this.el;
    }
}
//생산요청코드 없으면 '-'로 표시
class ProdReqCode {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        this.el.innerText = props.formattedValue == '' ? '-' : props.formattedValue;
    }
    getElement() {
        return this.el;
    }
}

// 생산 계획 테이블
const prodPlanList = new tui.Grid({
    el: document.getElementById('prodPlanList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 200,
    columns: [
        {
            header: '생산계획코드',
            name: 'prodPlanCode',
            align: 'center'
        },
        {
            header: '생산계획일자',
            name: 'planDate',
            align: 'center',

        },
        {
            header: '진행상태',
            name: 'prodPlanStatus',
            align: 'center',
            renderer: { type: PlanStatus }
        },
        {
            header: '담당자',
            name: 'usersCode',
            align: 'center'
        }
    ]
});

// 생산 계획 ajax
function getProdPlanList() {
    const startDate = '';
    const endDate = '';
    const planCode = '';

    const obj = { startDate, endDate, planCode };
    console.log(obj);

    const data = {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(obj)
    };

    fetch("/ajax/prodPlanList", data)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            prodPlanList.resetData(res);
        })
};

// 생산 계획 상세
const prodPlanDetail = new tui.Grid({
    el: document.getElementById('prodPlanDetail'),
    scrollX: false,
    scrollY: false,
    bodyHeight: 160,
    columns: [
        {
            header: '생산계획상세코드',
            name: 'prodPlanDetailCode',
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
            header: '계획수량',
            name: 'planCnt',
            align: 'center',
        }
    ],
    summary: {
        height: 40,
        position: 'bottom', // or 'top'
        columnContent: {
            productName: {
                template: function () {
                    return '합계';
                },
            },
            planCnt: {
                template: function (value) {
                    return priceFormat(value.sum) + '개';
                },
            },
        },
    },
});

//생산계획 클릭 시 아래 생산계획상세내용 출력
prodPlanList.on('click', e => {
    let plCode = prodPlanList.getValue(e.rowKey, "prodPlanCode");
    getProdPlanAll(plCode)
})

// 계획상세목록 ajax
async function getProdPlanAll(plCode) {
    await fetch(`/ajax/prodPlanAll?prodPlanCode=${plCode}`)
        .then(res => res.json())
        .then(res => {
            prodPlanDetail.resetData(res);
        })
    requireMatCal();
};

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
            header: '소요량',
            name: 'needCnt',
            align: 'end',
        },
        {
            header: '단위',
            name: 'unit',
        },
        {
            header: '단가',
            name: 'unitPrice',
            align: 'center',
            formatter: function (price) {
                return priceFormat(price.value);
            }
        }
    ]
});

// BOM 목록 ajax
function getBOMList() {
    fetch("/ajax/bomlist")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            BOMList.resetData(res);
        })
};

// 자재 재고 테이블
const matStockList = new tui.Grid({
    el: document.getElementById('matStockList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 160,
    rowHeaders: ['checkbox'],
    columns: [
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
            header: '현재고량',
            name: 'stockCnt',
            align: 'end',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
            validation: {
                validatorFn: (value, row, columnName) => Number(row['stockCnt']) > Number(row['safeStockCnt'])
            },
        },
        {
            header: '단위',
            name: 'unit',
            width: 50,
        },
        {
            header: '발주 진행 중 수량',
            name: 'orderedMat',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
        },
        {
            header: '소요량',
            name: 'requireMat',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
        },
        {
            header: '현재고+발주수량-소요량',
            name: 'differenceStockReq',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
            validation: {
                validatorFn: (value, row, columnName) => row['differenceStockReq'] == null || Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            }
        },
        {
            header: '안전재고량',
            name: 'safeStockCnt',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
        }
    ]
});

// 재고 조회(ajax)
function getMaterialsList() {
    const matName = '';
    fetch("/ajax/materials?matName=" + matName)
        .then(res => res.json())
        .then(res => {
            // ajax로 불러온 데이터 그리드에 넣음
            matStockList.resetData(res);
            for (let i = 0; i < res.length; i++) {
                matStockList.setValue(i, 'requireMat', 0)
            }
        })
};

// 재고 소요량 계산
function requireMatCal() {
    let BOMListData = BOMList.getData();
    let matStockListData = matStockList.getData();

    let needCnt = 0;
    let requireMat = 0;
    let requireMatSum = 0;

    // 자재
    for (let i = 0; i < matStockListData.length; i++) {
        requireMatSum = 0;
        let matCode = matStockListData[i].matCode
        // BOM
        for (let j = 0; j < BOMListData.length; j++) {
            needCnt = 0;
            if (matCode == BOMListData[j].matCode) {
                needCnt = BOMListData[j].needCnt;
                // 계획수량 찾기
                let planCnt = findPlanCnt(BOMListData[j].productCode);
                if (matCode == 'MAT00002') {
                    requireMat = Math.ceil(planCnt * needCnt / 60 / 30);
                } else if (matCode == 'MAT00009') {
                    requireMat = Math.ceil(planCnt * needCnt);
                } else {
                    requireMat = Math.ceil(planCnt * needCnt / 1000);
                }
                requireMatSum += requireMat;
            }
        }

        matStockList.setValue(i, 'requireMat', requireMatSum)

        // 현재고량과 예상 소요량 차이
        let diffStockReq = matStockList.getColumnValues('stockCnt')[i] + matStockList.getColumnValues('orderedMat')[i] - matStockList.getColumnValues('requireMat')[i];
        matStockList.setValue(i, 'differenceStockReq', diffStockReq)
    }
}

// 제품별 계획 수량 찾기
function findPlanCnt(productCode) {
    let prodPlanDetailData = prodPlanDetail.getData();
    let planCnt = 0

    for (let k = 0; k < prodPlanDetailData.length; k++) {
        if (productCode == prodPlanDetailData[k].productCode) {
            planCnt = prodPlanDetailData[k].planCnt;
            break;
        }
    }
    return planCnt;
}

// 자재 발주 테이블 행 추가
matStockList.on('checkAll', function () {
    let checked = matStockList.getCheckedRows();
    matOrderList.resetData(checked);
});
matStockList.on('check', function (ev) {
    let checked = matStockList.getRow(ev.rowKey);
    matOrderList.appendRow(checked);
});
matStockList.on('uncheckAll', function () {
    matOrderList.resetData([]);
});
matStockList.on('uncheck', function (ev) {
    let uncheckMatCode = matStockList.getValue(ev.rowKey, 'matCode')
    let data = matOrderList.getData()
    for (let i = 0; i < data.length; i++) {
        if (data[i].matCode == uncheckMatCode) {
            data.splice(i, 1)
            matOrderList.resetData(data)
        }
    }
});

// 자재 발주 테이블
const matOrderList = new tui.Grid({
    el: document.getElementById('matOrderList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 160,
    rowHeaders: ['checkbox'],
    columns: [
        {
            header: '자재코드',
            name: 'matCode',
            align: 'center',
            sortable: true,
        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
        },
        {
            header: '거래처코드',
            name: 'mainCompanyCode',
            align: 'center',
        },
        {
            header: '수량',
            name: 'ordersCnt',
            align: 'end',
            editor: {
                type: 'text'
            },
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
        },
        {
            header: '단위',
            name: 'unit',
        },
        {
            header: '가격',
            name: 'matOrdersPrice',
            align: 'center',
            formatter: function (price) {
                return priceFormat(price.value) + '원';
            }
        }
    ],
    summary: {
        height: 40,
        position: 'bottom', // or 'top'
        columnContent: {
            ordersCnt: {
                template: function () {
                    return '합계';
                },
            },
            matOrdersPrice: {
                template: function (value) {
                    return priceFormat(value.sum) + ' 원';
                },
            },
        },
    },
});

// 수량 받아서 가격 계산
matOrderList.on('afterChange', ev => {
    let changeRow = ev.changes[0]
    if (changeRow.columnName == "ordersCnt") {
        let unitPrice = matOrderList.getValue(changeRow.rowKey, 'unitPrice')
        matOrderList.setValue(changeRow.rowKey, 'matOrdersPrice', changeRow.value * unitPrice)
    }
})

// 발주 버튼 이벤트
document.getElementById('orderBtn').addEventListener('click', checkValidation)

// 수량 입력 체크
function checkValidation() {
    matOrderList.blur();

    let matOrdersData = matOrderList.getData()
    let result = 1;

    for (let i = 0; i < matOrdersData.length; i++) {
        // 발주 수량이 빈값이거나 0인 자재 체크
        if (Number(matOrdersData[i].ordersCnt) == 0) {
            alert(matOrdersData[i].matName + ' 수량을 확인해주세요.');
            matOrderList.focusAt(i, 3);
            result = 0;
            break;
        // 발주 수량이 숫자인지 체크
        } else if (isNaN(Number(matOrdersData[i].ordersCnt))) {
            alert(matOrdersData[i].matName + ' 수량을 숫자로 입력해주세요');
            matOrderList.focusAt(i, 3);
            result = 0;
            break;
        }
    }

    if (result) {
        insertMatOrders()
    }
}

// 자재 발주 등록
async function insertMatOrders() {
    let prodPlanCode = prodPlanList.getValue(prodPlanList.getFocusedCell().rowKey, 'prodPlanCode');
    let matOrderDetailVO = matOrderList.getData();

    console.log('prodPlanCode : ', prodPlanCode);
    console.log('matOrderDetail : ', matOrderDetailVO);

    const param = { prodPlanCode, matOrderDetailVO }

    console.log(param);

    let result = false;
    await fetch('/ajax/matOrdersInsert', {
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
        matOrderList.resetData();
        getMaterialsList();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "발주 완료!",
            text: "발주가 정상적으로 처리되었습니다.",
            showConfirmButton: false,
            timer: 1500
        });

    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "발주 실패",
            text: "발주가 정상적으로 처리되지 않았습니다.",
            showConfirmButton: false,
            timer: 1500
        });
    }
}