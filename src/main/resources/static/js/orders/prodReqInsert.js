// 1. 그리드 생성

// (1) 주문목록 그리드
const ordGrid = new tui.Grid({
	el : document.getElementById('ordGrid'),
  bodyHeight: 200,
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

// (2) 제품별 주문량 그리드
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
			formatter: function(cnt) {
				return priceFormat(cnt.value);
			},
    }, 
    {
      header : '기본 생산량',
      name : 'defaultProd',
      align : 'center',
      formatter: function(cnt) {
				return priceFormat(cnt.value);
			},
    }, 
		{
			header : '현재재고량',
			name : 'stockCnt',
			align : 'center',
      formatter: function(cnt) {
				return priceFormat(cnt.value);
			},
		}, 
		{
			header : '납품후재고량',
			name : 'afterOutCnt',
			align : 'center',
      formatter: function(cnt) {
				return priceFormat(cnt.value);
			},
      validation : {
        validatorFn : (value, row, columnName) => Number(row['afterOutCnt']) > 1000
      }
		}, 
    {
			header : '생산요청량',
			name : 'prodReqCnt',
			align : 'center',
      formatter: function(cnt) {
				return priceFormat(cnt.value);
			},
      editor: {
        type: 'text',
      }
		}, 
	],
})

// (3) 생산요청 그리드
const reqGrid = new tui.Grid({
	el : document.getElementById('reqGrid'),
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
			header : '생산요청량',
			name : 'prodReqCnt',
			align : 'center',
      formatter: function(cnt) {
				return priceFormat(cnt.value);
			},
      editor: {
        type: 'text',
      }
		},
	],
  summary: {
		align : 'center',
		height: 40,
		position: 'bottom', // or 'top'
		columnContent: {
			productCode: {
				template: function() {
					return '합계';
				}, 
			},
			prodReqCnt: {
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
		},
	}
})


// 2. 그리드 데이터 생성

// (1) 주문 조회
function getOrdersList(ordersCode){
	fetch(`ajax/ordersList?ordersCode=${ordersCode}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		ordGrid.resetData(res);
	})
}
getOrdersList('');

// (2) 제품목록 조회
function getProductList(){
  fetch('ajax/productList')
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
    for(product of res){
      // 납품 후 재고량 = 현재 재고량 + 기본 생산량 - 총주문수량
      product.afterOutCnt = product.stockCnt + product.defaultProd - product.totalOrdersCnt;
      // 생산요청수량 = 납품후재고량 - 안전재고량
      if((product.afterOutCnt - product.safeStockCnt) >= 0){
        product.prodReqCnt = 0;
      }
      else {
        product.prodReqCnt = product.safeStockCnt - product.afterOutCnt;
      }

    }
		prodGrid.resetData(res);
    // 생산요청 목록 함수 실행
    getReqList();
	})
}
getProductList();

// (3) 생산요청 목록
function getReqList() {
  let prodReqlist = [];
	let prodReqCnt = prodGrid.getColumnValues('prodReqCnt');
	for(let i = 0; i < prodGrid.getRowCount(); i++){
		if(prodReqCnt[i] != 0) {
			prodReqlist.push(prodGrid.getRow(i));
		}
	}
  reqGrid.resetData(prodReqlist);
  insertProdReq()
}

// 3. 등록 기능
function insertProdReq() {

  // prodReqCode;		// 생산요청코드
	// totalReqCnt;	// 총요청수량
	// reqDate;			// 요청일자
	// usersCode;		// 담당자코드
	// prodReqStatus;
  console.log(reqGrid.getData());
}