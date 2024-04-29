// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// 0. 기본값 세팅
setToday();

// 1. 그리드 생성

// (1) 주문목록 그리드
const ordGrid = new tui.Grid({
	el : document.getElementById('ordGrid'),
  	bodyHeight : 200,
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
			}
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
        validatorFn : (value, row, columnName) => Number(row['afterOutCnt']) >= 1000
      }
		}, 
    {
			header : '생산요청량',
			name : 'reqCnt',
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
			name : 'reqCnt',
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
			reqCnt: {
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
		},
	}
})


// 2. 그리드 데이터 생성

const weekData = getDateFromWeek(searchForm.dueWeek.value);
const dueStartDate = weekData.weekStart;
const dueEndDate = weekData.weekEnd;

let param = {dueStartDate, dueEndDate};
getOrdersList(param);

// (1) 주문 조회
function getOrdersList(param){
	getWeekDate();
	console.log(param)
	
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};
	console.log(data);

	fetch('ajax/prodReqOrdersList', data)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		console.log(res)
		ordGrid.resetData(res);
	})
	getProductList();
}

// (2) 제품목록 조회
async function getProductList(){
	const dueStartDate = dateFormat(searchForm.dueStartDate.value);
	const dueEndDate = dateFormat(searchForm.dueEndDate.value);

  let res = await fetch(`ajax/getReqProd?dueStartDate=${dueStartDate}&dueEndDate=${dueEndDate}`)
	let result = await res.json();
	
	for(product of result){
		// 납품 후 재고량 = 현재 재고량 + 기본 생산량 - 총주문수량
		product.afterOutCnt = product.stockCnt + product.defaultProd - product.totalOrdersCnt;
		// 생산요청수량 = 납품후재고량 - 안전재고량
		if((product.afterOutCnt - product.safeStockCnt) >= 0){
			product.reqCnt = 0;
		}
		else {
			product.reqCnt = product.safeStockCnt - product.afterOutCnt;
		}
	}
	prodGrid.resetData(result);
	// 생산요청 목록 함수 실행
	getReqList();
}

// (3) 생산요청 목록
function getReqList() {
  let prodReqlist = [];
	let reqCnt = prodGrid.getColumnValues('reqCnt');
	for(let i = 0; i < prodGrid.getRowCount(); i++){
		if(reqCnt[i] != 0) {
			console.log(prodGrid.getRow(i));
			prodReqlist.push(prodGrid.getRow(i));
		}
	}
  reqGrid.resetData(prodReqlist);

	// (4) 등록폼 데이터
	const prodReqSum = reqGrid.getSummaryValues('reqCnt').sum;
	document.querySelector('#totalReqCnt').value = priceFormat(prodReqSum);
	document.querySelector('#reqDate').value = new Date().toISOString().substring(0, 10);
}


// 3. 등록 기능
async function prodReqFunc() {

	// (1) 파라미터 준비
	const totalReqCnt = document.querySelector('#totalReqCnt').value
	const reqDate = document.querySelector('#reqDate').value
	const prodReqDetList = reqGrid.getData();
	const dueStartDate = dateFormat(searchForm.dueStartDate.value);
	const dueEndDate = dateFormat(searchForm.dueEndDate.value);

	const param = {totalReqCnt, reqDate, prodReqDetList, dueStartDate, dueEndDate}

	if(totalReqCnt == 0) {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "생산요청등록 실패",
			text: "생산요청수량이 지정되지 않았습니다.",
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}

	let result = false;

	// (2) fetch
	await fetch('ajax/insertProdReq',{
		method : 'post',
   		 headers: jsonHeaders,
		body : JSON.stringify(param)
	})
	.then(res => res.json())
	.then(res => {
    result = res;
  })

	if(result){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "생산요청등록 완료!",
			text: "생산요청등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
		searchReset();
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "생산요청등록 실패",
			text: "생산요청등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}

}


// 4. 검색기능

// (1) 오늘 날짜 기본값 세팅
function setToday(){
	const today = new Date()
	searchForm.today.value = dateFormat(today);
	const currWeekFormat = getWeekFromDate(today);
	
	const y = currWeekFormat.substring(0, 4);
	const w = parseInt(currWeekFormat.substring(6, 8)) + 2;
	const dueWeekFormat = y + '-W' + w;
	
	searchForm.dueWeek.value = dueWeekFormat;
}

// (2) 주간 일자 가져오기 
function getWeekDate(){
	const valid = document.querySelector('#defaultFormControlHelp');
	valid.innerHTML = ''

	const weekData = getDateFromWeek(searchForm.dueWeek.value);
	const weekStart = dateFormat(weekData.weekStart)
	const weekEnd = dateFormat(weekData.weekEnd)

	if(weekData.weekStart < new Date()){
		valid.innerHTML = '납기일자가 다음 주 이후인 주문만 선택가능합니다.'
		return;
	}

	searchForm.dueStartDate.value = weekStart;
	searchForm.dueEndDate.value = weekEnd;
}
getWeekDate();

// (3) 검색버튼 클릭 이벤트
function searchOrders() {
	const weekData = getDateFromWeek(searchForm.dueWeek.value);
	const dueStartDate = weekData.weekStart;
	const dueEndDate = weekData.weekEnd;

	let param = {dueStartDate, dueEndDate};
	console.log(param);
	getOrdersList(param);
}

// 초기화
function searchReset() {
	setToday();
	getOrdersList(param);
}