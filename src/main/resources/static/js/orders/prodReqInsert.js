// 1. 그리드 생성

// 주문목록 그리드
const ordGrid = new tui.Grid({
	el : document.getElementById('ordGrid'),
	scrollX : false,
	scrollY : true,
	// rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '주문코드',
      name : 'ordersCode',
      align : 'center',
			
    }, 
		{
      header : '주문일자',
      name : 'ordersDate',
      align : 'center',
      formatter: function(date) {
				return dateFormat(date);
			}
    }, 
    {
      header : '납기일자',
      name : 'dueDate',
      align : 'center',
      formatter: function(date) {
				return dateFormat(date);
			}
    }, 
    {
      header : '주문제품',
      name : 'cntStr',
      align : 'center',
    }, 
		{
			header : '총주문금액(원)',
			name : 'totalOrdersPrice',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
		{
			header : '거래처명',
			name : 'companyName',
			align : 'center',
		}, 
    {
			header : '담당자명',
			name : 'usersName',
			align : 'center',
		}, 
    {
			header : '주문상태',
			name : 'ordersStatus',
			align : 'center',
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
	],
})

// 제품별 주문량 그리드
const prodGrid = new tui.Grid({
	el : document.getElementById('prodGrid'),
	scrollX : false,
	scrollY : true,
	// rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '제품코드',
      name : 'productCode',
      align : 'center',
			
    }, 
		{
      header : '제품명',
      name : 'productName',
      align : 'center',
    }, 
    {
      header : '총주문수량',
      name : 'totalOrdersCnt',
      align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
    }, 
    {
      header : '기본 생산량',
      name : 'defaultProd',
      align : 'center',
      formatter: function(price) {
				return priceFormat(price.value);
			},
    }, 
		{
			header : '현재재고량',
			name : 'stockCnt',
			align : 'center',
      formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
		{
			header : '납품후재고량',
			name : 'afterOutCnt',
			align : 'center',
      formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
    {
			header : '생산요청량',
			name : 'prodReqCnt',
			align : 'center',
      formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
	],
})

// 2. gridData 생성

// 주문 조회(ajax)
function getOrdersList(ordersCode){
	fetch(`ajax/ordersList?ordersCode=${ordersCode}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		ordGrid.resetData(res);
	})
}
getOrdersList('');

function getProductList(){
  fetch('ajax/productList')
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
    console.log(res);
		prodGrid.resetData(res);
	})
}
getProductList();