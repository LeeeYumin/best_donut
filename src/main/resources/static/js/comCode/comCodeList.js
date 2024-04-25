// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// 주코드 그리드
const comCodeGrid = new tui.Grid({
	el : document.getElementById('comCodeGrid'),
  bodyHeight: 300,
	scrollX : false,
	scrollY : true,
	rowHeaders: ['rowNum'],
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '주코드',
      name : 'maincode',
      align : 'center',
			sortingType: 'desc',
			sortable: true,			
    }, 
    {
      header : '주코드명',
      name : 'maincodeName',
      align : 'center',
			sortingType: 'desc',
			sortable: true,			
    },
	],
})

// 부코드 그리드
const detCodeGrid = new tui.Grid({
	el : document.getElementById('detCodeGrid'),
  bodyHeight: 300,
	scrollX : false,
	scrollY : true,
	rowHeaders: ['rowNum'],
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '주코드',
      name : 'maincode',
      align : 'center',
			sortingType: 'desc',
			sortable: true,			
    }, 
    {
      header : '부코드',
      name : 'subcode',
      align : 'center',
			sortingType: 'desc',
			sortable: true,			
    }, 
    {
      header : '부코드명',
      name : 'subcodeName',
      align : 'center',
			sortingType: 'desc',
			sortable: true,			
    },
	],
})

// 주코드 데이터
async function getComCodeList() {
  let maincode = document.querySelector('#maincode').value;
  let maincodeName = document.querySelector('#maincodeName').value;
  let param = {maincode, maincodeName};

  const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	let res = await fetch('ajax/getComCodeList', data)
	let result = await res.json();

  comCodeGrid.resetData(result);
}

// 부코드 데이터
async function getComCodeDetList(maincode) {
  let subcode = document.querySelector('#subcode').value;
  let subcodeName = document.querySelector('#subcodeName').value;
  let param = {maincode, subcode, subcodeName};

  const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	let res = await fetch('ajax/getComCodeDetList', data)
	let result = await res.json();
  detCodeGrid.resetData(result);
}

// 클릭이벤트
comCodeGrid.on('click', (event) => {
  let maincode = comCodeGrid.getValue(event.rowKey, 'maincode');
  detSearchForm.reset();
  getComCodeDetList(maincode);

})

// 주코드 검색 초기화
function codeReset() {
  codeSearchForm.reset();
  getComCodeList();
}

// 부코드 검색 초기화
function detReset() {
  detSearchForm.reset();
  getComCodeDetList('');
}


// 함수 실행
getComCodeList();
getComCodeDetList('');