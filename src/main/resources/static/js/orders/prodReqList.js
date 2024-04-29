getProdReq({});

// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// prodReqGrid.  주문 조회

// 1. grid 생성
const prodReqGrid = new tui.Grid({
	el : document.getElementById('prodReqGrid'),
	scrollX : false,
	scrollY : true,
	bodyHeight : 300,
	rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [ 
		{
			header : '생산요청코드',
			name : 'prodReqCode',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		},
    {
      header : '요청일자',
      name : 'reqDate',
      align : 'center',
      sortingType: 'desc',
      sortable: true,			
      formatter: function(date) {
        return dateFormat(date.value);
      },
    }, 
    {
			header : '총요청수량',
			name : "totalReqCnt",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},  
		{
			header : '담당자명',
			name : 'usersName',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		}, 
		{
			header : '생산요청상태',
			name : 'prodReqStatus',
			align : 'center',
			sortingType: 'desc',
			sortable: true,
      formatter : 'listItemText',
      editor: {
        type:'text', 
        options: {
          listItems: [
            { text: '미반영', value: 'RS1' },
            { text: '반영', value: 'RS2' },
          ],
        }
      }
		}, 
	],
})

tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// 2. gridData 생성

// 주문 조회(ajax)
function getProdReq(param){
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	fetch('ajax/getProdReq', data)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		prodReqGrid.resetData(res);
	})
}


// 3. 이벤트

// 주문 검색버튼 클릭 이벤트
async function searchProdReq(){
	let prodReqCode = searchForm.prodReqCode.value;
	let usersName = searchForm.usersName.value;
	let prodReqStartDate = searchForm.prodReqStartDate.value;
	let prodReqEndDate = searchForm.prodReqEndDate.value;

	let param = {prodReqCode, usersName, prodReqStartDate, prodReqEndDate};
	getProdReq(param);
}

// 검색 초기화
function searchReset() {
	searchForm.reset();
	getProdReq({});
}

// 주문상세 목록 띄우기
prodReqGrid.on('click', (event) => {
	let prodReqCode = prodReqGrid.getValue(event.rowKey, 'prodReqCode')
	getProdReqDet(prodReqCode);
})


// prodReqDetGrid.  주문 상세 조회

// 1. grid 생성
const prodReqDetGrid = new tui.Grid({
	el : document.getElementById('prodReqDetGrid'),
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
		prodReqDetGrid.resetData(res);
	})
};

// 3. 이벤트
