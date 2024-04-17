getProdInsList();

/* < 공정완료 생산지시 목록 > */
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

// 공정완료 생산지시 목록 조회(ajax) -검색포함
async function getProdInsList(){

	const searchStartDate = document.getElementById('searchStartDate').value;
	const searchEndDate = document.getElementById('searchEndDate').value;
	const prodInstructCode = document.getElementById('prodInstructCode').value;

	const obj = {searchStartDate, searchEndDate, prodInstructCode};
	//console.log(obj);
	
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(obj)
	};

	let response = await fetch("/ajax/processResult", data)
	let res = await response.json();
	piList.resetData(res);

};

//검색버튼
document.getElementById('searchBtn').addEventListener('click', getProdInsList);
document.getElementById('prodInstructCode').addEventListener('keyup', (e) => {
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
			header : '완제품LOT',
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
			}
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
			className:'changeColor',
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
			validation : {
        validatorFn : value => value == 0
      }
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

//완료 지시 클릭 시 => 아래 상세내용 출력
piList.on('click', e => {
	let piCode = piList.getValue(e.rowKey, "prodInstructCode");

	//완료 상세목록
	getProdInsAll(piCode);

});

//완료 상세목록
// async function getProdInsAll(piCode){
// 	let response = await fetch(`/ajax/processResultDe?prodInstructCode=${piCode}`);
// 	let res = response.json();
// 	piAll.resetData(res);
// };
function getProdInsAll(piCode){
	fetch(`/ajax/processResultDe?prodInstructCode=${piCode}`)
	.then(res => res.json())
	.then(res => {
		piAll.resetData(res);
	})
};

