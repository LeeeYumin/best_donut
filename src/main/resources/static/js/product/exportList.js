// I. productGrid 제품조회

// 1. grid 생성
const prodInoutGrid = new tui.Grid({
	el : document.getElementById('prodInoutGrid'),
	scrollX : false,
	scrollY : true,
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
	],
})

// 2. gridData 생성

// 제품명 가져오기
async function getProductList() {
	let res = await fetch("ajax/productList")
	let result = await res.json();
	for(product of result){
		let optionHtml = '<option value="' + product.productName + '">' + product.productName + '</option>'
		let productName = document.querySelector("#productName")
		productName.insertAdjacentHTML('beforeend', optionHtml);
	}
};

// 거래처 목록 가져오기
function getCompany() {
  fetch('ajax/getCompany')
  .then(res => res.json())
  .then(res => {
		for(company of res){
			let optionHtml = '<option value="' + company.companyName + '">' + company.companyName + '</option>'
			let companyName = document.querySelector("#companyName")
			companyName.insertAdjacentHTML('beforeend', optionHtml);
		}
	})
}
getProductList();
getCompany();

// 그리드데이터 생성
function getProdInout(){

  let productInoutCode = document.querySelector("#productInoutCode").value;
  let productLotCode = document.querySelector("#productLotCode").value;
  let productName = document.querySelector("#productName").value;
  let companyName = document.querySelector("#companyName").value;
  let inoutSep = document.querySelector("#inoutSep").value;
  let searchStartDate = document.querySelector("#searchStartDate").value;
  let searchEndDate = document.querySelector("#searchEndDate").value;

  let param = {productInoutCode, productLotCode, productName, companyName, inoutSep, searchStartDate, searchEndDate};
	console.log(param);
	
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
	getProdInout();
}

// II. prodLotGrid.  완제품LOT조회

// // 1. grid 생성
// const prodLotGrid = new tui.Grid({
// 	el : document.getElementById('prodLotGrid'),
// 	scrollX : false,
// 	scrollY : true,
// 	header:[
// 		align = 'center',
// 	],
// 	columns : [ 
// 		{
// 			header : '완제품LOT코드',
// 			name : 'productLotCode',
// 			align : 'center',
// 			sortingType: 'desc',
// 			sortable: true,			
// 		},
// 		{
// 			header : '제품명',
// 			name : 'productName',
// 			align : 'center',
// 			sortingType: 'desc',
// 			sortable: true,			
// 		},
//     {
//       header : '입고수량',
//       name : 'warehousingCnt',
//       align : 'center',
//       sortingType: 'desc',
//       sortable: true,
//       formatter: function(price) {
// 				return priceFormat(price.value);
// 			},
//     }, 
//     {
// 			header : '검사완료수량',
// 			name : "checkDoneCnt",
// 			align : 'center',
//       sortingType: 'desc',
//       sortable: true,
// 			formatter: function(price) {
// 				return priceFormat(price.value);
// 			},
// 		},  
//     {
// 			header : '납품수량',
// 			name : "deliveryCnt",
// 			align : 'center',
//       sortingType: 'desc',
//       sortable: true,
// 			formatter: function(price) {
// 				return priceFormat(price.value);
// 			},
// 		},  
//     {
// 			header : '잔고수량',
// 			name : "remainCnt",
// 			align : 'center',
//       sortingType: 'desc',
//       sortable: true,
// 			formatter: function(price) {
// 				return priceFormat(price.value);
// 			},
// 		}, 
//     {
// 			header : '완제품상태',
// 			name : 'productStatus',
// 			align : 'center',
// 			sortingType: 'desc',
// 			sortable: true,
// 			formatter : 'listItemText',
// 			editor: {
// 				type: 'text',
// 				options: {
// 				listItems: [
// 					{ text: '보유', value: 'PD1' },
// 					{ text: '폐기', value: 'PD2' },
// 				],
// 				}
// 			}		
// 		}, 
//     {
// 			header : '폐기일자',
// 			name : 'dumpDate',
// 			align : 'center',
// 			sortingType: 'desc',
// 			sortable: true,			
// 		}, 
//     {
// 			header : '공정실적코드',
// 			name : 'procResultCode',
// 			align : 'center',
// 			sortingType: 'desc',
// 			sortable: true,			
// 		},
// 		{
// 			header : '유통기한',
// 			name : 'expDate',
// 			align : 'center',
// 			sortingType: 'desc',
// 			sortable: true,		
// 		},
// 	],
// })


// // 2. gridData 생성

// // 주문 조회(ajax)
// function getProdDet(param){
// 	console.log(param);
// 	const data = {
// 		method: 'POST',
// 		headers: jsonHeaders,
// 		body : JSON.stringify(param)
// 	};

// 	fetch('ajax/getProdDet', data)
// 	.then(res => res.json())
// 	.then(res => {
//     console.log(res);
// 		// ajax로 불러온 데이터 그리드에 넣음
// 		prodLotGrid.resetData(res);
// 	})
// }


// // 3. 이벤트

// // 주문 검색버튼 클릭 이벤트
// async function searchProd(){
// 	let productLotCode = document.querySelector('#prodLotCode').value;
// 	let productName = document.querySelector('#prodName').value;
// 	let expStartDate = document.querySelector('#expStartDate').value;
// 	let expEndDate = document.querySelector('#expEndDate').value;

// 	let param = {productLotCode, productName, expStartDate, expEndDate};
// 	getProdDet(param);
// }



// // 주문상세 목록 띄우기
// prodLotGrid.on('click', (event) => {
// 	let productLot = prodLotGrid.getValue(event.rowKey, 'productLotCode')
// 	getMatLot(productLot);
// })



// // III. matLotGrid.  주문 상세 조회

// // 1. grid 생성
// const matLotGrid = new tui.Grid({
// 	el : document.getElementById('matLotGrid'),
// 	scrollX : false,
// 	scrollY : true,
// 	rowHeaders: ['checkbox'],
// 	columns : [ 
//     {
//       header : '자재LOT코드',
//       name : 'matLotCode',
//       align : 'center',
//     }, 
// 		{
// 			header : '자재코드',
// 			name : 'matCode',
// 			align : 'center',
// 		}, 
//     {
//       header : '자재명',
//       name : 'matName',
//       align : 'center',
//     }, 
// 		{
// 			header : '자재수량',
// 			name : 'matCnt',
// 			align : 'center',
// 			formatter : {
// 				function(price) {
// 					return priceFormat(price);
// 				}
// 			}
// 		}, 
// 	],
// })

// // 2. gridData 생성

// // 주문 상세 조회(ajax)
// function getMatLot(productLotCode){
// 	fetch(`ajax/getProdMat?productLotCode=${productLotCode}`)
// 	.then(res => res.json())
// 	.then(res => {
// 		// ajax로 불러온 데이터 그리드에 넣음
// 		matLotGrid.resetData(res);
// 	})
// };


// // 3. 이벤트

getProdInout();