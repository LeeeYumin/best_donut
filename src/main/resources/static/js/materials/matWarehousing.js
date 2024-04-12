getMatWarehousingList();

// 입고 등록 테이블
const matWarehousing = new tui.Grid({
    el: document.getElementById('matWarehousing'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 240,
    rowHeaders: ['checkbox'],
    columns: [
        {
            header: '발주 코드',
            name: 'matOrdersCode',
            align: 'center'
        },
        {
            header: '거래처명',
            name: 'companyName',
            align: 'center',

        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
        },
        {
            header: '수량',
            name: 'ordersCnt',
            align: 'center',
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
            editor: {
                type: 'text'
            }
        },
        {
            header: '유통기한',
            name: 'expDate',
            align: 'center',
            editor: {
                type: 'datePicker',
                options: {
                    format: 'yyyy-MM-dd'
                }
            },
        },
        {
            header: '발주일자',
            name: 'ordersDate',
            align: 'center'
        },
        {
            header: '납기일자',
            name: 'dueDate',
            align: 'center'
        }
    ]
});

// 입고 예정 자재 목록 ajax
function getMatWarehousingList() {
    fetch("/ajax/materialwarehousing")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            matWarehousing.resetData(res);
        })
}