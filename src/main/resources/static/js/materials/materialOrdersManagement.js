getMaterialOrdersList();

const grid1 = new tui.Grid({
	el: document.getElementById('materialOrderList'),
	scrollX: false,
	scrollY: false,
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
			align: 'center'
		}
	]
});

// 발주 조회(ajax)
async function getMaterialOrdersList() {
	const matName = document.getElementById('matName').value;
	await fetch("/ajax/materialorders?matName=" + matName)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			grid1.resetData(res);
			console.log(res);
		})
};

// 검색 관련 함수  
document.getElementById('searchBtn').addEventListener('click', getMaterialOrdersList);
document.getElementById('matName').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getMaterialsList();
	}
})
document.getElementById('resetBtn').addEventListener('click', () => {
	document.getElementById('matName').value = '';
	getMaterialOrdersList();
	getMaterialOrderDetailsList();
});

const grid2 = new tui.Grid({
	el: document.getElementById('materialOrderDetail'),
	scrollX: false,
	scrollY: false,
	header: {
		height: 160,
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
			},
			rowSpan: true
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
			align: 'center',
			rowSpan: true
		},
		{
			header: '발주담당자',
			name: 'usersName',
			align: 'center',
			rowSpan: true
		}
	],
	summary: {
		height: 40,
		position: 'bottom', // or 'top'
		columnContent: {
			matOrdersPrice: {
				template: function (valueMap) {
					return `합계: ${priceFormat(valueMap.sum)}원`;
				}
			}
		}
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
	let matOrderCodes = '';
	for (i = 0; i < grid1.getCheckedRows().length; i++) {
		//matOrderCodes.push(grid1.getCheckedRows()[i].matOrdersCode); // json 스트링으로 넘길 때

		// String Array로 넘길 때
		if (i > 0) {
			matOrderCodes += "&"
		}
		matOrderCodes += "matOrderCodes=" + grid1.getCheckedRows()[i].matOrdersCode
	}
	getMaterialOrderDetailsList(matOrderCodes)
	console.log(matOrderCodes);
});
grid1.on('uncheckAll', (ev) => {

	let matOrderCodes = '';
	for (i = 0; i < grid1.getCheckedRows().length; i++) {
		if (i > 0) {
			matOrderCodes += "&"
		}
		matOrderCodes += "matOrderCodes=" + grid1.getCheckedRows()[i].matOrdersCode
	}
	grid2.resetData([]);
	//getMaterialOrderDetailsList(matOrderCodes)
	console.log(matOrderCodes);
});
grid1.on('check', (ev) => {
	let matOrderCodes = '';
	for (i = 0; i < grid1.getCheckedRows().length; i++) {
		if (i > 0) {
			matOrderCodes += "&"
		}
		matOrderCodes += "matOrderCodes=" + grid1.getCheckedRows()[i].matOrdersCode
	}
	getMaterialOrderDetailsList(matOrderCodes)
	console.log(matOrderCodes);
});
grid1.on('uncheck', (ev) => {
	if (grid1.getCheckedRows().length == 0) {
		grid2.resetData([]);
		return;
	}
	let matOrderCodes = '';
	for (i = 0; i < grid1.getCheckedRows().length; i++) {
		if (i > 0) {
			matOrderCodes += "&"
		}
		matOrderCodes += "matOrderCodes=" + grid1.getCheckedRows()[i].matOrdersCode
	}
	getMaterialOrderDetailsList(matOrderCodes)
	console.log(matOrderCodes);
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
