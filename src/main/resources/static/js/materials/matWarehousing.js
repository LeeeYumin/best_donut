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
    const sDate = document.getElementById('sDate').value;
    const eDate = document.getElementById('eDate').value;
    const matName = document.getElementById('matName').value;

    if (sDate != '' && eDate != '' && sDate > eDate) {
        Swal.fire({
            title: "시작일이 종료일보다 늦습니다.",
            icon: "warning"
        });
    } else {
        const searchreq = { sDate: sDate, eDate: eDate, matName: matName };
        const data = {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(searchreq)
        };

        fetch("/ajax/materialwarehousing", data)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                matWarehousing.resetData(res);
            })
    }
}

// 검색 조건
document.getElementById('searchBtn').addEventListener('click', getMatWarehousingList);
document.getElementById('matName').addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        getMatWarehousingList();
    }
})
// 초기화 버튼
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('sDate').value = '';
    document.getElementById('eDate').value = '';
    document.getElementById('matName').value = '';

    getMatWarehousingList();
});

// 입고 버튼
document.getElementById('insertBtn').addEventListener('click', checkValidation);

// 유효성 검사
function checkValidation() {
    matWarehousing.blur();

    let warehousingData = matWarehousing.getCheckedRows();
    let validation = 1;

    if (warehousingData == '') {
        alert('입고할 자재를 선택해 주세요.');
        validation = 0;
    } else {
        for (let i = 0; i < warehousingData.length; i++) {
            if (warehousingData[i].ordersCnt == 0) {
                alert('수량이 0인 자재는 입고할 수 없습니다.');
                validation = 0;
                matWarehousing.focusAt(i, 3)
                break;
            } else if (warehousingData[i].matCode != 'MAT00009' && warehousingData[i].expDate == null) {
                alert('유통기한을 입력해주세요.');
                validation = 0;
                matWarehousing.focusAt(i, 4)
                break;
            }
        }
    }

    if (validation) {
        insertMatWarehousing()
    }
}

// 자재 입고 등록
async function insertMatWarehousing() {
    let MaterialWarehousingVO = matWarehousing.getCheckedRows();

    console.log(MaterialWarehousingVO);

    const param = { MaterialWarehousingVO }

    let result = false;
    await fetch('/ajax/matWarehousingInsert', {
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
        Swal.fire({
            position: "center",
            icon: "success",
            title: "입고 완료!",
            text: "입고가 정상적으로 처리되었습니다.",
            showConfirmButton: false,
            timer: 1500
        });

    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "입고 실패",
            text: "입고가 정상적으로 처리되지 않았습니다.",
            showConfirmButton: false,
            timer: 1500
        });
    }
}