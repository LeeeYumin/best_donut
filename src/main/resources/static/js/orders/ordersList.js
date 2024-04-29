getOrdersList({});
getCompany();

// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row: {
		hover: {
			background: '#ccc'
		}
	}
})

if (document.querySelector('#auth').innerHTML != '1') {
	console.log('삭제버튼 숨김');
	document.querySelector('#delBtn').setAttribute('style', 'display : none;');
}

// ordGrid.  주문 조회

// 1. grid 생성
const ordGrid = new tui.Grid({
	el: document.getElementById('ordGrid'),
	scrollX: false,
	scrollY: true,
	bodyHeight : 200,
	rowHeaders: ['checkbox'],
	header: [
		align = 'center',
	],
	columns: [
		{
			header: '주문코드',
			name: 'ordersCode',
			align: 'center',
			sortingType: 'desc',
			sortable: true,
		},
		{
			header: '주문일자',
			name: 'ordersDate',
			align: 'center',
			sortingType: 'desc',
			sortable: true,
			formatter: function (date) {
				return dateFormat(date.value);
			},
		},
		{
			header: '납기일자',
			name: 'dueDate',
			align: 'center',
			sortingType: 'desc',
			sortable: true,
			formatter: function (date) {
				return dateFormat(date.value);
			}
		},
		{
			header: '주문제품',
			name: 'cntStr',
			align: 'center',
		},
		{
			header: '총주문금액',
			name: "totalOrdersPrice",
			align: 'center',
			formatter: function (price) {
				return priceFormat(price.value);
			}
		},
		{
			header: '주문상태',
			name: 'ordersStatus',
			align: 'center',
			sortingType: 'desc',
			sortable: true,
			formatter: 'listItemText',
			editor: {
				type: 'select',
				options: {
					listItems: [
						{ text: '미확인', value: 'OP1' },
						{ text: '확인', value: 'OP2' },
					],
				}
			}
		},
		{
			header: '담당자명',
			name: 'usersName',
			align: 'center',
		},
		{
			header: '거래처명',
			name: 'companyName',
			align: 'center',
		},
	],
})

// 2. gridData 생성

// 주문 조회(ajax)
function getOrdersList(param) {
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body: JSON.stringify(param)
	};

	fetch('ajax/ordersList', data)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			ordGrid.resetData(res);
		})
}


// 3. 이벤트

// 주문 검색버튼 클릭 이벤트
async function searchOrders() {
	let ordersCode = searchForm.ordersCode.value;
	let companyName = searchForm.companyName.value;
	let ordersStartDate = searchForm.ordersStartDate.value;
	let ordersEndDate = searchForm.ordersEndDate.value;
	let dueStartDate = searchForm.dueStartDate.value;
	let dueEndDate = searchForm.dueEndDate.value;
	let usersName = searchForm.usersName.value;

	let param = { ordersCode, companyName, ordersStartDate, ordersEndDate, dueStartDate, dueEndDate, usersName };
	getOrdersList(param);
}

// 검색 초기화
function searchReset() {
	searchForm.reset();
	getOrdersList({});
}

// 주문상세 목록 띄우기
ordGrid.on('click', (event) => {
	let ordersCode = ordGrid.getValue(event.rowKey, 'ordersCode')
	getOrdersDetail(ordersCode);
})


// detGrid.  주문 상세 조회

// 1. grid 생성
const detGrid = new tui.Grid({
	el: document.getElementById('detGrid'),
	scrollX: false,
	scrollY: true,
	rowHeaders: ['checkbox'],
	columns: [
		{
			header: '주문코드',
			name: 'ordersCode',
			align: 'center',
			hidden: true,
		},
		{
			header: '주문상세코드',
			name: 'ordersDetailCode',
			align: 'center',
		},
		{
			header: '완제품코드',
			name: 'productCode',
			align: 'center',
		},
		{
			header: '완제품명',
			name: 'productName',
			align: 'center',
		},
		{
			header: '주문수량',
			name: 'ordersCnt',
			align: 'center',
		},
		{
			header: '공급가액',
			name: 'supplyPrice',
			align: 'center',
			formatter: function (price) {
				return priceFormat(price.value);
			}
		},
		{
			header: '부가세',
			name: "tax",
			align: 'center',
			formatter: function (price) {
				return priceFormat(price.value);
			}
		},
		{
			header: '총공급대가',
			name: "totalSupplyPrice",
			align: 'center',
			formatter: function (price) {
				return priceFormat(price.value);
			}
		},
	],
})

// 2. gridData 생성

// 주문 상세 조회(ajax)
function getOrdersDetail(ordersCode) {
	fetch(`ajax/ordersDetail?ordersCode=${ordersCode}`)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			detGrid.resetData(res);
		})
};

// 3. 이벤트

// 주문 삭제
function deleteOrders() {

	let checkedList = ordGrid.getCheckedRows();
	let delList = [];
	for (orders of checkedList) {
		delList.push(orders.ordersCode)
	}

	Swal.fire({
		title: "해당 주문을 삭제하시겠습니까?",
		text: "삭제 후엔 복구가 불가능합니다.",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "삭제",
		cancelButtonText: '취소'
	}).then((result) => {
		if (result.isConfirmed) {
			fetch('ajax/deleteOrders', {
				method: 'POST',
				headers: jsonHeaders,
				body: JSON.stringify(delList)
			})
			.then(res => res.json())
			.then(res => {
				if (res > 0) {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "주문삭제 완료!",
						text: "주문삭제가 정상적으로 처리되었습니다.",
						showConfirmButton: false,
						timer: 1500
					});
					detGrid.clear();
					searchReset();
				}
				else {
					Swal.fire({
						position: "center",
						icon: "error",
						title: "주문삭제 실패",
						text: "주문삭제가 정상적으로 처리되지 않았습니다.",
						showConfirmButton: false,
						timer: 1500
					});
				}
			})
		}
	});
}
// 거래처 목록 가져오기
// 그리드 생성
const companyGrid = new tui.Grid({
	el: document.getElementById('companyGrid'),
	scrollX: false,
	scrollY: true,
	header: [
		align = 'center',
	],
	columns: [
		{
			header: '거래처코드',
			name: 'companyCode',
			align: 'center',

		},
		{
			header: '거래처명',
			name: 'companyName',
			align: 'center',
		},
	]
})

// 데이터 생성
function getCompany() {
	fetch('ajax/getCompany')
		.then(res => res.json())
		.then(res => {
			console.log(res);

			// 모달창 다 띄워지고 나서 그리드 데이터 가져오기
			$(document).ready(function () {
				$('#modalCenter').on('shown.bs.modal', function (e) {
					companyGrid.resetData(res);
					// 그리드 refresh
					companyGrid.refreshLayout()
				})
			})
		})
}

// 거래처 그리드 클릭시 거래처명 가져옴
companyGrid.on('click', (event) => {
	// input에 거래처명 입력
	searchForm.companyName.value = companyGrid.getValue(event.rowKey, 'companyName');
	// 닫기버튼 클릭
	document.getElementById('closeBtn').click();
})

// 주문 상태 변경(확인/미확인)
function modifyOrdStat() {

	let checkedList = ordGrid.getCheckedRows();
	console.log(checkedList)

	Swal.fire({
		title: "해당 주문의 주문상태를 변경하시겠습니까?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "변경",
		cancelButtonText: '취소'
	}).then((result) => {
		if (result.isConfirmed) {

			fetch('ajax/updateOrdCheck', {
				method: 'POST',
				headers: jsonHeaders,
				body: JSON.stringify(checkedList)
			})
			.then(res => res.json())
			.then(res => {
				if (res > 0) {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "주문상태 변경 완료!",
						text: "주문상태 변경이 정상적으로 처리되었습니다.",
						showConfirmButton: false,
						timer: 1500
					});
					detGrid.clear();
					searchReset();
				}
				else {
					Swal.fire({
						position: "center",
						icon: "error",
						title: "주문상태 변경 실패",
						text: "주문상태 변경이 정상적으로 처리되지 않았습니다.",
						showConfirmButton: false,
						timer: 1500
					});
				}
			})
		}
	});
}