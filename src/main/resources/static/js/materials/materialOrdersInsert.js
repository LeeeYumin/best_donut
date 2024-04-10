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
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
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
                    return priceFormat(value.sum) + ' 개';
                },
            },
        },
    },
});

//생산계획 클릭 시 아래 생산계획상세내용 출력
prodPlanList.on('click', e => {
    let plCode = prodPlanList.getValue(e.rowKey, "prodPlanCode");
    //계획상세목록
    getProdPlanAll(plCode)
})

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
    bodyHeight: 160,
    columns: [
        {
            header: 'BOM 코드',
            name: 'bomCode',
            align: 'center',
            sortable: true,
            rowSpan: true
        },
        {
            header: '제품명',
            name: 'productCode',
            align: 'center',
            rowSpan: true
        },
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
            sortable: true,
            // validation: {
            // 	validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
            // validation: {
            // 	validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '현재고량',
            name: 'stockCnt',
            align: 'end',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
            // validation: {
            //     validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '단위',
            name: 'unit',
            // validation: {
            //     validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '소요량',
            name: 'requireMat',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
            // validation: {
            //     validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '현재고-소요량',
            name: 'differenceStockReq',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
            // validation: {
            // 	validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '안전재고량',
            name: 'safeStockCnt',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            }
            // validation: {
            // 	validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
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
            console.log(res);
        })
};

// 소요량 계산 함수
function requireMatCal() {
    let requireMatData = matStockList.getData();
    let needCntData = BOMList.getData();
    let planCntData = prodPlanDetail.getData();

    let planAllCnt = prodPlanDetail.getSummaryValues('planCnt').sum;
    let matCode = matStockList.getColumnValues('matCode');
    let needCnt = 0;

    for (let i = 0; i < requireMatData.length; i++) {
        for (let j = 0; j < needCntData.length; j++) {
            if (needCntData[j].matCode == requireMatData[i].matCode) {
                needCnt = needCntData[j].needCnt;
            }
        }

        if (matCode[i] == 'MAT00002') {
            matStockList.setValue(i, 'requireMat', Math.ceil(planAllCnt * needCnt / 60 / 30))
        } else if (matCode[i] == 'MAT00009') {
            matStockList.setValue(i, 'requireMat', planAllCnt)
        }
        
        matStockList.setValue(i, 'differenceStockReq', matStockList.getColumnValues('stockCnt')[i] - matStockList.getColumnValues('requireMat')[i])
    }

}

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
            // validation: {
            //     validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '가격',
            name: 'matOrdersPrice',
            align: 'center',
            formatter: function (price) {
                return priceFormat(price.value) + ' 원';
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

matOrderList.on('afterChange', ev => {
    let changeRow = ev.changes[0]
    if (changeRow.columnName == "ordersCnt") {
        let unitPrice = matOrderList.getValue(changeRow.rowKey, 'unitPrice')
        matOrderList.setValue(changeRow.rowKey, 'matOrdersPrice', changeRow.value * unitPrice)
    }
})

document.getElementById('orderBtn').addEventListener('click', insertMatOrders)

// 자재 발주 등록
function insertMatOrders() {
    matOrderList.blur();

    let prodPlanCode = prodPlanList.getValue(prodPlanList.getFocusedCell().rowKey, 'prodPlanCode');
    let matTotalOrdersPrice = matOrderList.getSummaryValues('matOrdersPrice').sum;

    console.log(prodPlanCode);
    console.log(matTotalOrdersPrice);

}