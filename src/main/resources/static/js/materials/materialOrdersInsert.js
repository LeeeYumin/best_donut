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
    bodyHeight: 120,
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
            header: '생산요청코드',
            name: 'prodReqCode',
            align: 'center',
            renderer: { type: ProdReqCode }
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

// BOM 테이블
const BOMList = new tui.Grid({
    el: document.getElementById('BOMList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 120,
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
    bodyHeight: 120,
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
            align: 'center',
            // validation: {
            //     validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '소요량',
            name: 'requireMat',
            align: 'center',
            // validation: {
            //     validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '현재고-소요량',
            name: 'differenceStockReq',
            align: 'center',
            // validation: {
            // 	validatorFn: (value, row, columnName) => Number(row['differenceStockReq']) > Number(row['safeStockCnt'])
            // }
        },
        {
            header: '안전재고량',
            name: 'safeStockCnt',
            align: 'center',
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
            for (let i = 0; i < res.length; i++) {
                matStockList.setValue(i, 'requireMat', 0)
                matStockList.setValue(i, 'differenceStockReq', matStockList.getColumnValues('stockCnt')[i] - matStockList.getColumnValues('requireMat')[i])
            }
            console.log(res);
        })
};

matStockList.on('checkAll', function () {
    let checked = matStockList.getCheckedRows();
    matOrderList.resetData(checked);
});
matStockList.on('check', function (ev) {
    console.log(ev);
    let checked = matStockList.getRow(ev.rowKey);
    matOrderList.appendRow(checked);
});
matStockList.on('uncheckAll', function () {
    let checked = matStockList.getCheckedRows();
    matOrderList.resetData(checked);
});
matStockList.on('uncheck', function (ev) {
    let uncheckMatCode = matStockList.getValue(ev.rowKey, 'matCode')
    console.log(uncheckMatCode)
    let data = matOrderList.getData()
    for (let i = 0; i < data.length; i++) {
        // if (data[i].matCode == uncheckMatCode) {
        //     matOrderList.removeRow(i)
        // }
    }
});

// 자재 발주 테이블
const matOrderList = new tui.Grid({
    el: document.getElementById('matOrderList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 120,
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
            align: 'center',
            editor: {
                type: 'text'
            }
        },
        {
            header: '가격',
            name: 'matOrdersPrice',
            align: 'center',
        }
    ]
});

matOrderList.on('afterChange', ev => {
    let changeRow = ev.changes[0]
    if (changeRow.columnName == "ordersCnt") {
        let unitPrice = matOrderList.getValue(changeRow.rowKey, 'unitPrice')
        console.log('after change:', unitPrice);
        matOrderList.setValue(changeRow.rowKey, 'matOrdersPrice', changeRow.value * unitPrice)
    }
})