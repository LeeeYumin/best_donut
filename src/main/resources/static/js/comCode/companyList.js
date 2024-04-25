searchCompany();

// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// if(document.querySelector('#auth').innerHTML != '1'){
// 	console.log('삭제버튼 숨김');
// 	document.querySelector('#delBtn').setAttribute('style', 'display : none;');
// }

// 3. 이벤트

// 검색 초기화
function searchReset() {
	searchForm.reset();
	searchCompany();
}


// 거래처 목록 가져오기
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
        {
            header : '대표자명',
            name : 'ownerName',
            align : 'center',
        }, 
        {
            header : '연락처',
            name : 'tel',
            align : 'center',
        }, 
        {
            header : '주소',
            name : 'addr',
            align : 'center',
        }, 
	],
	columnOptions: {
        resizable: true
	}
})

// 주문 검색버튼 클릭 이벤트
async function searchCompany(){
	let companyCode = searchForm.companyCode.value;
	let companyName = searchForm.companyName.value;
	let ownerName = searchForm.ownerName.value;
	let addr = searchForm.addr.value;

	let param = {companyCode, companyName, ownerName, addr};
	getCompany(param);
}

// 데이터 생성
function getCompany(param) {

  let data = {
    method: 'POST',
    headers: jsonHeaders,
    body : JSON.stringify(param)
  };

 fetch('ajax/getCompanySearchList', data)
 .then(res => res.json())
 .then(res => {
	 console.log(res);
   companyGrid.resetData(res);
  })
}
