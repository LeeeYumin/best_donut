
getProdDet({});

// prodLotGrid.  주문 조회

// 1. grid 생성
const prodLotGrid = new tui.Grid({
	el : document.getElementById('prodLotGrid'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [ 
		{
			header : '생산요청코드',
			name : 'productLotCode',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		},
    {
      header : '입고수량',
      name : 'warehousingCnt',
      align : 'center',
      sortingType: 'desc',
      sortable: true,
      formatter: function(price) {
				return priceFormat(price.value);
			},
    }, 
    {
			header : '검사완료수량',
			name : "checkDoneCnt",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
			formatter: function(price) {
				return priceFormat(price.value);
			},
		},  
    {
			header : '납품수량',
			name : "deliveryCnt",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
			formatter: function(price) {
				return priceFormat(price.value);
			},
		},  
    {
			header : '잔고수량',
			name : "remainCnt",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
			formatter: function(price) {
				return priceFormat(price.value);
			},
		},  
		{
			header : '품질검사상태',
			name : 'qltyCheckStatus',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		}, 
    {
			header : '완제품상태',
			name : 'productStatus',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		}, 
    {
			header : '폐기일자',
			name : 'dumpDate',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		}, 
    {
			header : '제품코드',
			name : 'productCode',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		},
    {
			header : '공정실적코드',
			name : 'procResultCode',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		}
	],
})


// 2. gridData 생성

// 주문 조회(ajax)
function getProdDet(param){
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	fetch('ajax/getProdDet', data)
	.then(res => res.json())
	.then(res => {
    console.log(res);
		// ajax로 불러온 데이터 그리드에 넣음
		prodLotGrid.resetData(res);
	})
}


// 3. 이벤트

// 주문 검색버튼 클릭 이벤트
async function searchProd(){
	let prodLotCode = searchForm.prodLotCode.value;
	let prodName = searchForm.prodName.value;

	let param = {prodLotCode, prodName};
	getProdReq(param);
}

// 검색 초기화
function searchReset() {
	searchForm.reset();
	getProdReq({});
}

// 주문상세 목록 띄우기
prodLotGrid.on('click', (matLotGrid) => {
	let prodLotGrid = prodReqGrid.getValue(event.rowKey, 'matLotGrid')
	getProdReqDet(prodLotGrid);
})


// matLotGrid.  주문 상세 조회

// 1. grid 생성
const matLotGrid = new tui.Grid({
	el : document.getElementById('matLotGrid'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	columns : [ 
    {
      header : '생산요청코드',
      name : 'prodReqCode',
      align : 'center',
    }, 
		{
			header : '생산요청상세코드',
			name : 'prodReqDetailCode',
			align : 'center',
		}, 
    {
      header : '제품명',
      name : 'productName',
      align : 'center',
    }, 
		{
			header : '요청수량',
			name : 'reqCnt',
			align : 'center',
		}, 
	],
})

// 2. gridData 생성

// 주문 상세 조회(ajax)
function getProdReqDet(prodReqCode){
	fetch(`ajax/getProdReqDet?prodReqCode=${prodReqCode}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		matLotGrid.resetData(res);
	})
};

// 3. 이벤트
