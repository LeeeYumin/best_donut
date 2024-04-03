getOrdersList('');

// grid1.  주문 조회

// 1. grid 생성
const grid1 = new tui.Grid({
	el : document.getElementById('grid1'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [ 
		{
			header : '주문코드',
			name : 'ORDERS_CODE',
			align : 'center',
		}, 
		{
			header : '주문일자',
			name : 'ORDERS_DATE',
			align : 'center',

			formatter: function(date) {
				return dateFormat(date);
			},
		}, 
		{
			header : '납기일자',
			name : 'DUE_DATE',
			align : 'center',
			formatter: function(date) {
				return dateFormat(date);
			}
		}, 
		{
			header : '총주문금액',
			name : "TOTAL_ORDERS_PRICE",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '주문상태',
			name : 'ORDERS_STATUS',
			align : 'center',
		}, 
		{
			header : '담당자명',
			name : 'USERS_NAME',
			align : 'center',
		}, 
		{
			header : '거래처명',
			name : 'COMPANY_NAME',
			align : 'center',
		},
	]
})


// 2. gridData 생성

// 주문 조회(ajax)
async function getOrdersList(ordersCode){
	console.log('ordersCode : ' + ordersCode);
	await fetch(`ajax/ordersList?ordersCode=${ordersCode}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		grid1.resetData(res);
	})
}


// 3. 이벤트

// 주문 검색버튼 클릭 이벤트
function searchOrders(){
	let ordersCode = document.querySelector('#ordersCode').value;
	getOrdersList(ordersCode);
}

// 검색 초기화
function searchReset() {
	document.querySelector('#ordersCode').value = '';
	getOrdersList('');
}

// 주문상세 목록 띄우기
grid1.on('click', (event) => {
	let ordersCode = grid1.getValue(event.rowKey, 'ORDERS_CODE')
	getOrdersDetail(ordersCode);
})


// grid2.  주문 상세 조회

// 1. grid 생성
const grid2 = new tui.Grid({
	el : document.getElementById('grid2'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	columns : [ 
		{
			header : '주문상세코드',
			name : 'ORDERS_DETAIL_CODE',
			align : 'center',
		}, 
		{
			header : '완제품코드',
			name : 'PRODUCT_CODE',
			align : 'center',
		}, 
		{
			header : '완제품명',
			name : 'PRODUCT_NAME',
			align : 'center',
		}, 
		{
			header : '주문수량',
			name : 'ORDERS_CNT',
			align : 'center',
		}, 
		{
			header : '공급가액',
			name : 'SUPPLY_PRICE',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '부가세',
			name : "TAX",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '총공급대가',
			name : "TOTAL_SUPPLY_PRICE",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
	]
})

// 2. gridData 생성

// 주문 상세 조회(ajax)
async function getOrdersDetail(ordersCode){
	console.log('ordersCode : ' + ordersCode);
	await fetch(`ajax/ordersDetail?ordersCode=${ordersCode}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		grid2.resetData(res);
	})
};

// 3. 이벤트