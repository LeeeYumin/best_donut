getProdInsList();


/* < 생산지시 목록 > */
const piList = new tui.Grid({
	el : document.getElementById('piList'),
	bodyHeight: 200,
	scrollX : false,
	scrollY : true,
	rowHeaders: ['rowNum'],
	columns : [
		{
			header : '생산지시코드',
			name : 'prodInstructCode',
			align: 'center'
		}, 
		{
			header : '생산지시일자',
			name : 'instructDate',
			align: 'center'
		}, 
		{
			header : '담당자',
			name : 'usersCode',
			align: 'center'
		}
	]
});

// 생산지시 목록 조회(ajax) -검색포함
async function getProdInsList(){

	const searchStartDate = document.getElementById('searchStartDate').value;
	const searchEndDate = document.getElementById('searchEndDate').value;
	const prodInstructCode = document.getElementById('prodInstructCode').value;

	const obj = {searchStartDate, searchEndDate, prodInstructCode};
	console.log(obj);
	
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(obj)
	};

	await fetch("/ajax/processResult", data)
	.then(res => res.json())
	.then(res => {
		console.log(res);
		piList.resetData(res);
	})
};

//검색버튼
document.getElementById('searchBtn').addEventListener('click', getProdInsList);
document.getElementById('prodInstructCode').addEventListener('keyup', (e) => { //*확인하기
	if (e.keyCode == 13) {
		getProdInsList();
	}
})

//초기화버튼
document.getElementById('resetBtn').addEventListener('click', function() {
	document.getElementById('searchStartDate').value = '';
	document.getElementById('searchEndDate').value = '';
	document.getElementById('prodInstructCode').value = '';
	piList.resetData([]);
	getProdInsList();
});

//=================================================================
/* < 생산지시 상세 목록 > */
const piAll = new tui.Grid({
	el : document.getElementById('piAll'),
	scrollX : false,
	scrollY : false,
	columns : [
		{
			header : '생산지시상세코드',
			name : 'prodInstructDetailCode',
			align: 'center'
		}, 
			{
			header : '완제품코드',
			name : 'productLotCode',
			align: 'center'
		},
		{
			header : '제품코드',
			name : 'productCode',
			align: 'center'
		},
		{
			header : '제품명',
			name : 'productName',
			align: 'center'
		},
		{
			header : '지시수량',
			name : 'instructCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
			editor: 'text'
		},
		{
			header : '미생산수량',
			name : 'notProdCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
		},
		{
			header : '생산수량',
			name : 'prodCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
		{
			header : '불량수량',
			name : 'failCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
			editor: 'text'
		},
	],
	// summary: {
	// 	//align: 'right',
	// 	height: 40,
	// 	position: 'bottom',
	// 	columnContent: {
	// 		prodPlanDetailCode: {
	// 			template: function() {
	// 				return '총 계획수량 합계';
	// 			}, 
	// 		},
	// 		planCnt: {
	// 			//align: 'right',
	// 			template: function(value) {
	// 				return priceFormat(value.sum);
	// 			}, 
	// 		},
	// 	},
	// }	
});

//생산계획 클릭 시 => 아래 생산계획상세내용 출력
// plList.on('click', e => {
// 	let status = plList.getValue(e.rowKey, "prodPlanStatus");
// 	let plCode = plList.getValue(e.rowKey, "prodPlanCode");

// 	//계획상세목록
// 	getProdPlanAll(plCode);

// 	//계획상태가 미지시이면 수정가능하게
// 	if(status == 'LS1') {
// 		plAll.enableColumn('fixCnt');

// 	}else { //아니면 수정불가
// 		plAll.disableColumn('fixCnt');
// 	}		
// });
getProdInsAll('PIN00025');
function getProdInsAll(piCode){
	fetch(`/ajax/processResultDe?prodInstructCode=${piCode}`)
	.then(res => res.json())
	.then(res => {

		piAll.resetData(res);
	})
};

