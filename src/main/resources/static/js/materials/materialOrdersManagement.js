getMaterialOrdersList();

// 발주 상태
class OrderStatusConverter {
	constructor(props) {
		const el = document.createElement('div');

		this.el = el;
		this.render(props);
	}
	render(props) {
		if (props.formattedValue == 'OSP') {
			this.el.innerText = '발주 진행 중';
		} else if (props.formattedValue == 'OSN') {
			this.el.innerText = '미입고';
		} else if (props.formattedValue == 'OSY') {
			this.el.innerText = '입고';
		} else {
			this.el.innerText = '발주 취소';
		}
	}
	getElement() {
		return this.el;
	}
}

const grid1 = new tui.Grid({
	el: document.getElementById('materialOrderList'),
	scrollX: false,
	scrollY: true,
	bodyHeight: 240,
	rowHeaders: ['checkbox'],
	columns: [
		{
			header: '발주일자',
			name: 'ordersDate',
			align: 'center',
			sortable: true,
			rowSpan: true
		},
		{
			header: '발주코드',
			name: 'matOrdersCode',
			align: 'center',
			sortable: true
		},
		{
			header: '담당자',
			name: 'usersName',
			align: 'center'
		},
		{
			header: '금액',
			name: 'matTotalOrdersPrice',
			align: 'center',
			formatter: function (price) {
				return priceFormat(price.value) + '원';
			}
		},
		{
			header: '발주진행상태',
			name: 'totalOrdersStatus',
			align: 'center',
			renderer: { type: OrderStatusConverter }
		},
		{
			header: '거래처명',
			name: 'companyName',
			align: 'center'
		},
	]
});

// 발주 조회(ajax)
function getMaterialOrdersList() {
	const companyName = document.getElementById('companyName').value;
	const sDate = document.getElementById('sDate').value;
	const eDate = document.getElementById('eDate').value;
	const ordersStatus = document.querySelector("[name=ordersStatus]:checked").value;

	if (sDate != '' && eDate != '' && sDate > eDate) {
		Swal.fire({
			title: "시작일이 종료일보다 늦습니다.",
			icon: "warning"
		});
	} else {
		const searchreq = { sDate, eDate, ordersStatus, companyName };
		const data = {
			method: 'POST',
			headers: jsonHeaders,
			body: JSON.stringify(searchreq)
		};

		fetch("/ajax/materialorders", data)
			.then(res => res.json())
			.then(res => {
				// ajax로 불러온 데이터 그리드에 넣음
				grid1.resetData(res);
				grid2.resetData([]);
				console.log(res);
			})
	}
};

// 검색 관련 함수  
document.getElementById('searchBtn').addEventListener('click', getMaterialOrdersList);
document.getElementById('companyName').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getMaterialOrdersList();
	}
})

// 초기화 버튼
document.getElementById('resetBtn').addEventListener('click', () => {
	document.getElementById('sDate').value = '';
	document.getElementById('eDate').value = '';
	document.getElementById('companyName').value = '';
	$('input:radio[name=ordersStatus]:input[value=""]').prop("checked", true);

	getMaterialOrdersList();
	grid2.resetData([]);
});

const grid2 = new tui.Grid({
	el: document.getElementById('materialOrderDetail'),
	scrollX: false,
	scrollY: false,
	header: {
		height: 150,
		complexColumns: [
			{
				header: '수주업체',
				name: 'company',
				childNames: ['companyName', 'ownerName']
			},
			{
				header: '발주서',
				name: 'materialOrders',
				childNames: ['ordersDate', 'company', 'matName', 'ordersCnt', 'unitPrice', 'matOrdersPrice', 'dueDate', 'usersName']
			}
		]
	},
	columns: [
		{
			header: '발주일자',
			name: 'ordersDate',
			align: 'center',
			rowSpan: true
		},
		{
			header: '업체명',
			name: 'companyName',
			align: 'center',
			rowSpan: true
		},
		{
			header: '대표자',
			name: 'ownerName',
			align: 'center',
			rowSpan: true
		},

		{
			header: '자재명',
			name: 'matName',
			align: 'center',
			rowSpan: true
		},
		{
			header: '수량',
			name: 'ordersCnt',
			align: 'center'
		},
		{
			header: '단가',
			name: 'unitPrice',
			align: 'center',
			formatter: function (price) {
				return priceFormat(price.value);
			}
		},
		{
			header: '금액',
			name: 'matOrdersPrice',
			align: 'center',
			formatter: function (price) {
				return priceFormat(price.value) + '원';
			}
		},
		{
			header: '납기일자',
			name: 'dueDate',
			align: 'center'
		},
		{
			header: '발주담당자',
			name: 'usersName',
			align: 'center'
		}
	],
	summary: {
		align: 'center',
		height: 40,
		position: 'bottom', // or 'top'
		columnContent: {
			unitPrice: {
				template: function () {
					return '합계';
				},
			},
			matOrdersPrice: {
				template: function (value) {
					return priceFormat(value.sum) + '원';
				},
			},
		},
	},
	contextMenu: ({ rowKey, columnName }) => [
		[
			{
				name: 'export',
				label: 'Export',
				subMenu: [
					{
						name: 'csvExport',
						label: 'CSV export',
						action: () => {
							grid2.export('csv');
						},
					},
					{
						name: 'excelExport',
						label: 'Excel export(xlsx)',
						action: () => {
							grid2.export('xlsx');
						},
					},
					{
						name: 'excelExport',
						label: 'Excel export(xls)',
						action: () => {
							grid2.export('xls');
						},
					},
				],
			},
		]
	]
});

// 발주서 선택
grid1.on('checkAll', (ev) => {
	let matOrderCodes = createparam();
	getMaterialOrderDetailsList(matOrderCodes)
});
grid1.on('uncheckAll', (ev) => {
	grid2.resetData([]);

});
grid1.on('check', (ev) => {
	let matOrderCodes = createparam();
	getMaterialOrderDetailsList(matOrderCodes)
});
grid1.on('uncheck', (ev) => {
	if (grid1.getCheckedRows().length == 0) {
		grid2.resetData([]);
		return;
	}

	let matOrderCodes = createparam();
	getMaterialOrderDetailsList(matOrderCodes)
});

// 발주서 단건 조회(ajax)
function getMaterialOrderDetailsList(matOrderCodes) {
	fetch("/ajax/matorderdetail?" + matOrderCodes)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			grid2.resetData(res);
			console.log(res);
		})
};

// Param 만들기
function createparam() {
	let matOrderCodes = '';
	for (i = 0; i < grid1.getCheckedRows().length; i++) {
		//matOrderCodes.push(grid1.getCheckedRows()[i].matOrdersCode); // json 스트링으로 넘길 때
		// String Array로 넘길 때
		if (i > 0) {
			matOrderCodes += "&"
		}
		matOrderCodes += "matOrderCodes=" + grid1.getCheckedRows()[i].matOrdersCode
	}

	return matOrderCodes;
}

// 발주 취소
document.getElementById('cancelBtn').addEventListener('click', cancelOrder);

// 발주 취소 기능
function cancelOrder() {
	if (grid1.getCheckedRows() == '') {
		Swal.fire({
			position: "center",
			icon: "warning",
			title: '선택된 주문건이 없습니다.',
			text: ' ',
			showConfirmButton: false,
			timer: 1500
		});
	} else if (checkOrderStatus()) {
		let matOrderCodes = createparam();
		Swal.fire({
			title: "정말로 발주를 취소하시겠습니까?",
			text: " ",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "네",
			cancelButtonText: "취소",
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				fetch("/ajax/matordercancel?" + matOrderCodes)
					.then(res => res.json())
					.then(res => {
						// 발주 취소 후 발주 목록 업데이트
						getMaterialOrdersList();
					})
				Swal.fire({
					title: "발주 취소 완료",
					text: " ",
					icon: "success",
					showConfirmButton: false,
					timer: 1500
				});
			}
		});
	} else {
		Swal.fire({
			position: "center",
			icon: "warning",
			title: '발주 취소 실패',
			text: '취소할 수 없는 상태의 주문이 선택되었습니다.',
			showConfirmButton: false,
			timer: 1500
		});
	}
}

function checkOrderStatus() {
	let tf = true;
	let checkdata = grid1.getCheckedRows();

	for (let i = 0; i < checkdata.length; i++) {
		if (checkdata[i].totalOrdersStatus != 'OSP') {
			grid1.uncheck(checkdata[i].rowKey);
			tf = false;
		}
	}
	return tf;
}

// EXCEL 버튼 이벤트
$('#excelBtn').on('click', excelDownload);

function excelDownload() {
	const oDate = grid1.getCheckedRows()[0].ordersDate;
	const cName = grid1.getCheckedRows()[0].companyName;
	const oCnt = grid1.getCheckedRows().length - 1;
	let options = {};

	if (oCnt == 0) {
		options = {
			fileName: oDate + ' ' + cName + ' 발주서',
		};
	} else {
		options = {
			fileName: oDate + ' ' + cName + ' 외 ' + oCnt + '건 발주서',
		};
	}

	grid2.export('xlsx', options);
}


// 발주 취소 버튼 권한 체크
if ($('#auth').html() != '1') {
	$('#cancelBtn').attr('style', 'display:none;');
}