getStartParam();

// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// I. productGrid 제품조회

// 1. grid 생성
const prodInoutGrid = new tui.Grid({
	el : document.getElementById('prodInoutGrid'),
	scrollX : false,
	scrollY : true,
	bodyHeight: 500,
	header:[
		align = 'center',
	],
	columns : [ 
		{
			header : '완제품입출코드',
			name : 'productInoutCode',
			align : 'center',
			sortingType: 'asc',
			sortable: true,			
		},
		{
			header : '입출구분',
			name : 'inoutSep',
			align : 'center',
			sortingType: 'desc',
			sortable: true,
      formatter : 'listItemText',
      editor: {
        options: {
          listItems: [
            { text: '입고', value: 'IO1' },
            { text: '출고', value: 'IO2' }
          ],
        }
      }
		},
    {
      header : '입출수량',
      name : 'inoutCnt',
      align : 'center',
      sortingType: 'desc',
      sortable: true,
    }, 
    {
			header : '입출일자',
			name : "inoutDate",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
		},  
    {
			header : '완제품LOT코드',
			name : "productLotCode",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
		}, 
    {
			header : '제품명',
			name : "productName",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
		},
    {
			header : '거래처명',
			name : "companyName",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
		}, 
    {
			header : '담당자명',
			name : "usersName",
			align : 'center',
      sortingType: 'desc',
      sortable: true,
		}, 
	],
})

// 2. gridData 생성

// (1) 제품명 목록 가져오기
// 그리드 생성
const productGrid = new tui.Grid({
	el : document.getElementById('productGrid'),
	scrollX : false,
	scrollY : true,
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
	]
})

// 데이터 생성
function getProductList() {
 fetch('ajax/productList')
 .then(res => res.json())
 .then(res => {
	 console.log(res);

	// 모달창 다 띄워지고 나서 그리드 데이터 가져오기
	$(document).ready(function(){
    $('#modalCenter1').on('shown.bs.modal', function(e) {
			productGrid.resetData(res);
			// 그리드 refresh
			productGrid.refreshLayout()
			})
    })
	})
}

// 거래처 그리드 클릭시 거래처명 가져옴
productGrid.on('click', (event) => {
	// input에 거래처명 입력
	searchForm.productName.value = productGrid.getValue(event.rowKey, 'productName');
	// 닫기버튼 클릭
	document.getElementById('closeBtn1').click();
})

getProductList();


// (2)거래처 목록 가져오기
// 그리드 생성
const companyGrid = new tui.Grid({
	el : document.getElementById('companyGrid'),
	scrollX : false,
	scrollY : true,
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '거래처코드',
      name : 'companyCode',
      align : 'center',
			
    }, 
		{
      header : '거래처명',
      name : 'companyName',
      align : 'center',
    }, 
	]
})

// 데이터 생성
function getCompany() {
 fetch('ajax/getCompany')
 .then(res => res.json())
 .then(res => {
	 console.log(res);

	// 모달창 다 띄워지고 나서 그리드 데이터 가져오기
	$(document).ready(function(){
    $('#modalCenter').on('shown.bs.modal', function(e) {
			companyGrid.resetData(res);
			// 그리드 refresh
			companyGrid.refreshLayout()
			})
    })
	})
}

// 거래처 그리드 클릭시 거래처명 가져옴
companyGrid.on('click', (event) => {
	// input에 거래처명 입력
	searchForm.companyName.value = companyGrid.getValue(event.rowKey, 'companyName');
	// 닫기버튼 클릭
	document.getElementById('closeBtn').click();
})

getCompany();

// 페이지 로드 시 기본 목록데이터 생성
function getStartParam() {
	let today = new Date();

	let searchStartDate = dateFormat(new Date(today.setDate(today.getDate() - 1)));
  let searchEndDate = dateFormat(new Date());
	let param = {searchStartDate, searchEndDate};
	getProdInout(param);
}

// 검색조건 파라미터 생성
function getSearchParam() {
	let productInoutCode = document.querySelector("#productInoutCode").value;
  let productLotCode = document.querySelector("#productLotCode").value;
  let productName = document.querySelector("#productName").value;
  let companyName = document.querySelector("#companyName").value;
  let inoutSep = searchForm.inoutSep.value;
  let searchStartDate = document.querySelector("#searchStartDate").value;
  let searchEndDate = document.querySelector("#searchEndDate").value;

  let param = {productInoutCode, productLotCode, productName, companyName, inoutSep, searchStartDate, searchEndDate};
	console.log(param);

	getProdInout(param);
}

// 그리드데이터 생성
function getProdInout(param){
  const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	fetch('ajax/getProdInout', data)
	.then(res => res.json())
	.then(res => {
    console.log(res);
		// ajax로 불러온 데이터 그리드에 넣음
		prodInoutGrid.resetData(res);
	})
}

// 검색 초기화
function searchReset() {
	searchForm.reset();
	getStartParam();
}