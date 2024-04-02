getOrdersList();

// Toast UI grid
// 그리드 속성, 헤더 정의 / html 요소와 연결
const grid = new tui.Grid({
	el : document.getElementById('grid'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	header:[
		align = "center",
	],
	columns : [ 
		{
			header : '주문코드',
			name : 'ORDERS_CODE',
		}, 
		{
			header : '주문일자',
			name : 'ORDERS_DATE',
			formatter: function(date) {
				return dateFormat(date);
			},
		}, 
		{
			header : '납기일자',
			name : 'DUE_DATE',
			formatter: function(date) {
				return dateFormat(date);
			}
		}, 
		{
			header : '총주문금액',
			name : "TOTAL_ORDERS_PRICE",
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '주문상태',
			name : 'ORDERS_STATUS',
		}, 
		{
			header : '담당자명',
			name : 'USERS_NAME',
		}, 
		{
			header : '거래처명',
			name : 'COMPANY_NAME',
		},
	]
})

grid.on('click', (event) => {
	  console.log(event);
	})

// 주문 조회(ajax)
async function getOrdersList(){
	await fetch("/ajax/ordersList")
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		console.log(res);
		grid.resetData(res);
	})
};

// 날짜 포맷 함수
function dateFormat(date) {
	let dateForm = new Date(date.value);
	let year = dateForm.getFullYear();
	let month = ('0' + (dateForm.getMonth() + 1)).slice(-2);
	let day = ('0' + dateForm.getDate()).slice(-2);
	let dateStr = `${year}/${month}/${day}`;
	return dateStr;
}

// 금액 포맷 함수
function priceFormat(price) {
	let result = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	return result;
}

function searchOrders(){
	console.log(formSearch.ordersCode.value);
	formSearch.submit();
}