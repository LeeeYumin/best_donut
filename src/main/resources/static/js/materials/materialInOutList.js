// inoutSeps 전역변수로 선언
let inoutSeps = [];

// 초기 화면은 입고 목록 그려주기
getMatInList();

// 불출 구분 렌더링
class OutSepConverter {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        if (props.formattedValue == 'OUT') {
            this.el.innerText = '불출';
        } else {
            this.el.innerText = '폐기';
        }
    }
    getElement() {
        return this.el;
    }
}

// 입고 버튼 눌렀을 때
document.getElementById('inList-tab').addEventListener('click', getMatInList);

// 출고 버튼 눌렀을 때
document.getElementById('outList-tab').addEventListener('click', getMatOutList);

// 자재 입고 목록 상태값 설정
function getMatInList() {
    inoutSeps = ['IN'];
    getMatInOutList(inoutSeps);
}

// 자재 출고 목록 상태값 설정
function getMatOutList() {
    inoutSeps = ['OUT', 'DIS'];
    getMatInOutList(inoutSeps);
}

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
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
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
            formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
        },
        {
            header: '구분',
            name: 'inoutSep',
            align: 'center',
            renderer: { type: OutSepConverter }
        }
    ]
});

// 입출고 목록 불러오는 ajax
function getMatInOutList(inoutSeps) {
    // 탭 구분
    var tapane;
    if (inoutSeps.length == 1) {
        tapane = document.getElementById('inList')
    } else {
        tapane = document.getElementById('outList')
    }

    // 해당 탭의 검색 조건들
    const sDate = tapane.querySelector('#sDate').value;
    const eDate = tapane.querySelector('#eDate').value;
    const matName = tapane.querySelector('#matName').value;
    const matLotCode = tapane.querySelector('#matLotCode').value;

    // 시작일 종료일 확인
    if (sDate != '' && eDate != '' && sDate > eDate) {
        Swal.fire({
            title: "시작일이 종료일보다 늦습니다.",
            icon: "warning"
        });
        return;
    }

    // 검색 조건으로 데이터 불러옴
    const searchreq = { sDate: sDate, eDate: eDate, matName: matName, matLotCode: matLotCode, inoutSeps: inoutSeps };

    const data = {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(searchreq)
    };

    // 입고일 때
    if (inoutSeps.length == 1) {
        fetch("/ajax/getMatInOutList", data)
            .then(res => res.json())
            .then(res => {
                // ajax로 불러온 데이터 그리드에 넣음
                warehousingList.resetData(res);
                setTimeout(() => { warehousingList.refreshLayout() }, 300); // 데이터 불러오기 전에 화면 그리기 방지
            })
    } else { // 출고일 때
        fetch("/ajax/getMatInOutList", data)
            .then(res => res.json())
            .then(res => {
                // ajax로 불러온 데이터 그리드에 넣음
                outgoingList.resetData(res);
                setTimeout(() => { outgoingList.refreshLayout() }, 300); // 데이터 불러오기 전에 화면 그리기 방지
            })
    }
};

// 검색 버튼
$('.searchBtn').on('click', () => {
    getMatInOutList(inoutSeps)
});

// 자재명 엔터키 검색
$('.matName').on('keyup', (e) => {
    if (e.keyCode == 13) {
        getMatInOutList(inoutSeps);
    }
})

// 자재LOT코드 엔터키 검색
$('.matLotCode').on('keyup', (e) => {
    if (e.keyCode == 13) {
        getMatInOutList(inoutSeps);
    }
})

// 초기화 버튼
$('.resetBtn').on('click', () => {
    document.querySelectorAll('sDate').value = '';
    document.querySelectorAll('eDate').value = '';
    document.querySelectorAll('matName').value = '';
    document.querySelectorAll('matLotCode').value = '';

    getMatInOutList(inoutSeps);
});
