getMaterialOrdersList();

const grid1 = new tui.Grid({
	el: document.getElementById('materialOrderList'),
	scrollX: false,
	scrollY: false,
	rowHeaders: ['checkbox'],
	columns: [
		{
			header: '발주코드',
			name: 'matOrdersCode',
			align: 'center',
			sortable: true
		},
		{
			header: '거래처코드',
			name: 'companyCode',
			align: 'center'
		},
		{
			header: '자재코드',
			name: 'matCode',
			align: 'center',
			sortable: true,
			validation: {}
		},
		{
			header: '납기요청일',
			name: 'deliveryDate',
			align: 'center'
		},
		{
			header: '금액(원)',
			name: 'matTotalOrdersPrice',
			align: 'center'
		},
		{
			header: '발주진행상태',
			name: 'totalOrdersStatus',
			align: 'center'
		},
		{
			header: '발주일자',
			name: 'ordersDate',
			align: 'center'
		}
	]
});

// 재고 조회(ajax)
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
	columns: [
		{
			header: 'LOT',
			name: 'matLotCode',
			align: 'center',
			sortable: true
		},
		{
			header: '자재코드',
			name: 'matCode',
			align: 'center'
		},
		{
			header: '자재명',
			name: 'matName',
			align: 'center',
			sortable: true,
		},
		{
			header: '입고수량',
			name: 'warehousingCnt',
			align: 'center'
		},
		{
			header: '불출수량',
			name: 'outCnt',
			align: 'center'
		},
		{
			header: '현재고량',
			name: 'remainCnt',
			align: 'center'
		},
		{
			header: '유통기한',
			name: 'expDate',
			align: 'center'
		},
		{
			header: '자재상태',
			name: 'matStatus',
			align: 'center'
		}
	]
});

grid1.on('click', (ev) => {
	let matCode = grid1.getValue(ev.rowKey, 'matCode')
	console.log(matCode);
	getMaterialOrderDetailsList(matCode);
})

// 상세 로트 조회(ajax)
async function getMaterialOrderDetailsList(matCode) {
	await fetch("/ajax/materiallots?matCode=" + matCode)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			grid2.resetData(res);
			console.log(res);
		})
};
