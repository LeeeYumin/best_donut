getOrdersList({});

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
			name : 'ordersCode',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		}, 
		{
			header : '주문일자',
			name : 'ordersDate',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
			formatter: function(date) {
				return dateFormat(date.value);
			},
		}, 
		{
			header : '납기일자',
			name : 'dueDate',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
			formatter: function(date) {
				return dateFormat(date.value);
			}
		}, 
		{
		header : '주문제품',
		name : 'cntStr',
		align : 'center',
		}, 
		{
			header : '총주문금액',
			name : "totalOrdersPrice",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '주문상태',
			name : 'ordersStatus',
			align : 'center',
			sortingType: 'desc',
			sortable: true,	
			formatter : 'listItemText',
			editor: {
				type: 'text',
				options: {
				listItems: [
					{ text: '미확인', value: 'OP1' },
					{ text: '확인', value: 'OP2' },
					{ text: '생산요청', value: 'OP3' },
					{ text: '납품완료', value: 'OP4' },
				],
				}
			}
		}, 
		{
			header : '담당자명',
			name : 'usersName',
			align : 'center',
		}, 
		{
			header : '거래처명',
			name : 'companyName',
			align : 'center',
		},
	],
	pageOptions: {
        useClient: true,
        perPage: 5
      }
})


// 2. gridData 생성

// 주문 조회(ajax)
function getOrdersList(param){
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	fetch('ajax/ordersList', data)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		grid1.resetData(res);
	})
}


// 3. 이벤트

// 거래처 목록 가져오기
function getCompany() {
  fetch('ajax/getCompany')
  .then(res => res.json())
  .then(res => {

		for(company of res){
			let optionHtml = '<option value="' + company.companyCode + '">' + company.companyName + '</option>'
			let companyName = document.querySelector("#companyName")
			companyName.insertAdjacentHTML('beforeend', optionHtml);
		}
	})
}
getCompany();

// 주문 검색버튼 클릭 이벤트
async function searchOrders(){
	let ordersCode = searchForm.ordersCode.value;
	let companyCode = searchForm.companyName.value;
	let ordersStartDate = searchForm.ordersStartDate.value;
	let ordersEndDate = searchForm.ordersEndDate.value;
	let dueStartDate = searchForm.dueStartDate.value;
	let dueEndDate = searchForm.dueEndDate.value;
	console.log('companyCode : ', companyCode);

	let param = {ordersCode, companyCode, ordersStartDate, ordersEndDate, dueStartDate, dueEndDate};
	getOrdersList(param);
}

// 검색 초기화
function searchReset() {
	searchForm.reset();
	getOrdersList({});
}

// 주문상세 목록 띄우기
grid1.on('click', (event) => {
	let ordersCode = grid1.getValue(event.rowKey, 'ordersCode')
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
			header : '주문코드',
			name : 'ordersCode',
			align : 'center',
			hidden : true,
		}, 
		{
			header : '주문상세코드',
			name : 'ordersDetailCode',
			align : 'center',
		}, 
		{
			header : '완제품코드',
			name : 'productCode',
			align : 'center',
		}, 
		{
			header : '완제품명',
			name : 'productName',
			align : 'center',
		}, 
		{
			header : '주문수량',
			name : 'ordersCnt',
			align : 'center',
		}, 
		{
			header : '공급가액',
			name : 'supplyPrice',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '부가세',
			name : "tax",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '총공급대가',
			name : "totalSupplyPrice",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
	],
})

// 2. gridData 생성

// 주문 상세 조회(ajax)
function getOrdersDetail(ordersCode){
	fetch(`ajax/ordersDetail?ordersCode=${ordersCode}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		grid2.resetData(res);
	})
};

// 3. 이벤트