
// 입고 목록 테이블
const warehousingList = new tui.Grid({
    el: document.getElementById('warehousingList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 240,
    columns: [
        {
            header: '입고일자',
            name: 'inoutDate',
            align: 'center'
        },
        {
            header: 'LOT',
            name: 'matLotCode',
            align: 'center',

        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
        },
        {
            header: '거래처명',
            name: 'companyName',
            align: 'center',
        },
        {
            header: '수량',
            name: 'inoutCnt',
            align: 'center',
        }
    ]
});

// 출고 목록 테이블
const outgoingList = new tui.Grid({
    el: document.getElementById('outgoingList'),
    scrollX: false,
    scrollY: true,
    bodyHeight: 240,
    columns: [
        {
            header: '출고일자',
            name: 'inoutDate',
            align: 'center'
        },
        {
            header: 'LOT',
            name: 'matLotCode',
            align: 'center',

        },
        {
            header: '자재명',
            name: 'matName',
            align: 'center',
        },
        {
            header: '거래처명',
            name: 'companyName',
            align: 'center',
        },
        {
            header: '수량',
            name: 'inoutCnt',
            align: 'center',
        },
        {
            header: '구분',
            name: 'inoutSep',
            align: 'center',
        }
    ]
});