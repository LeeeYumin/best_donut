getOrdersList({});

// ordGrid.  주문 조회

// 1. grid 생성
const ordGrid = new tui.Grid({
	el : document.getElementById('ordGrid'),
	scrollX : false,
	scrollY : true,
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
		ordGrid.resetData(res);
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

	let param = {ordersCode, companyCode, ordersStartDate, ordersEndDate, dueStartDate, dueEndDate};
	getOrdersList(param);
}

// 검색 초기화
function searchReset() {
	searchForm.reset();
	getOrdersList({});
}

// 주문상세 목록 띄우기, 주문코드 가져오기
ordGrid.on('click', (event) => {
	let ordersCode = ordGrid.getValue(event.rowKey, 'ordersCode');
	document.querySelector('#ordersCodeInput').value = ordersCode;
	getOrdersDetail(ordersCode);
})


// detGrid.  주문 상세 조회

// 1. grid 생성
const detGrid = new tui.Grid({
	el : document.getElementById('detGrid'),
	bodyHeight : 200,
	scrollX : false,
	scrollY : true,
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
			header : '완제품명',
			name : 'productName',
			align : 'center',
		}, 
		{
			header : '주문수량',
			name : 'ordersCnt',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
		{
			header : '재고수량',
			name : 'stockCnt',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
			validation : {
        validatorFn : (value, row, columnName) => Number(row['stockCnt']) > Number(row['ordersCnt'])
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
		detGrid.resetData(res);
	})
};

// 3. 이벤트

function insertProdOut() {
	// 1. history insrt
	fetch(`ajax/insertProdOut`)
}


// 등록입력창 세팅
document.querySelector('#inoutDate').value = dateFormat(new Date());
document.querySelector('#userName').value = '김현준';