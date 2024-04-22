getWeeklyPlan();
getEqmOpr();

//생산요청코드 없으면 '-'로 표시
class ProdReqCode {
	constructor(props) {
		const el = document.createElement('div');

		this.el = el;
		this.render(props);
	}
	render(props) {
		this.el.innerText = props.formattedValue == '' ? '-' : props.formattedValue;
	}
	getElement() {
		return this.el;
	}
}
//생산계획 진행상태
class PlanStatus {
	constructor(props) {
		const el = document.createElement('div');

		this.el = el;
		this.render(props);
	}
	render(props) {
		this.el.innerText = props.formattedValue == 'LS1' ? '미지시' : '지시등록';
	}
	getElement() {
		return this.el;
	}
};

class CustomNumberEditor {
constructor(props) {
	const el = document.createElement('input');
	const { maxLength } = props.columnInfo.editor.options;

	el.type = 'number';
	el.min = 0;
	el.max = 1000;
	el.step = 100;
	el.style.width = '100%';
	this.el = el;
}

getElement() {
	return this.el;
}

getValue() {
	return this.el.value;
}

mounted() {
	this.el.select();
}
};

//================================================================
/* < 생산계획 > */
const wplan = new tui.Grid({
	el : document.getElementById('wplan'),
	scrollX : false,
	scrollY : false,
	bodyHeight: 40,
	minBodyHeight: 40,
	columns : [
		{
			header : '생산계획코드',
			name : 'prodPlanCode',
			align: 'center'
		}, 
		{
			header : '생산계획일자',
			name : 'planDate',
			align: 'center',
			
		},
		{
			header : '생산요청코드',
			name : 'prodReqCode',
			align: 'center',
			renderer: {type: ProdReqCode}
		},
		{
			header : '진행상태',
			name : 'prodPlanStatus',
			align: 'center',
			renderer: {type: PlanStatus}
		}, 
		{
			header : '담당자',
			name : 'usersCode',
			align: 'center',
			hidden: true
		},
		{
			header : '담당자',
			name : 'usersName',
			align: 'center'
		}
	]
});


/* < 생산계획 상세 > */
const wplanD = new tui.Grid({
	el : document.getElementById('wplanD'),
	scrollX : false,
	scrollY : false,
	rowHeaders: ['checkbox'],
	columns : [
		{
			header : '생산계획상세코드',
			name : 'prodPlanDetailCode',
			align: 'center'
		}, 
			{
			header : '생산요청상세코드',
			name : 'prodReqDetailCode',
			align: 'center',
			renderer: {type: ProdReqCode}
			
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
			header : '고정수량',
			name : 'fixCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
		{
			header : '요청수량',
			name : 'reqCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
		},
		{
			header : '계획수량',
			name : 'planCnt',
			align: 'center',
			className: 'plan-cnt',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
		{
			header : '미지시수량',
			name : 'notInstructCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
			// validation : {
			// 	validatorFn : value => value == 0
			// }
			renderer: {
				styles: {
					backgroundColor: (props) => props.value > 0 ? '#FFE5E5' : ''
				},
			},
		},
		{
			header : '지시완료수량',
			name : 'instructDoneCnt',
			align: 'center',
			//className: 'ins-done-cnt',
			renderer: {
				styles: {
					backgroundColor: (props) => props.value > 0 ? 'rgba(191, 227, 243, 0.548)' : ''
				},
			},
			formatter: function(price) {
				return priceFormat(price.value);
			},
		}
	],
	summary: {
		height: 40,
		position: 'bottom',
		columnContent: {
			prodPlanDetailCode: {
				template: function() {
					return '합계';
				}, 
			},
			planCnt: {
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
			instructDoneCnt: {
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
			notInstructCnt: {
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
		},
	}
});

// 주간생산계획조회(ajax)
async function getWeeklyPlan(){
	let response = await fetch("/ajax/weeklyPlan");
	let res = await response.json();

	wplan.resetData(res.weeklyPlan); //ServiceImpl에서 넘겨 준 변수명
	wplanD.resetData(res.weeklyPlanDe);

	beforeInsertInsCode();
};

//================================================================

/* < 생산지시 > */

//등록
const piInsert = new tui.Grid({
	el : document.getElementById('piInsert'),
	scrollX : false,
	scrollY : false,
	bodyHeight: 40,
	minBodyHeight: 40,
	columns : [
		{
			header : '생산지시코드',
			name : 'prodInstructCode',
			align: 'center',
		},
		{
			header : '생산계획코드',
			name : 'prodPlanCode',
			align: 'center',
			//editor: 'text'
		},
		{
			header : '생산지시일자',
			name : 'instructDate',
			align: 'center',
			editor: 'text'
		},
		{
			header : '담당자',
			name : 'usersCode',
			align: 'center',
			hidden: true
		},
		{
			header : '담당자',
			name : 'usersName',
			align: 'center'
		}
	]
});

async function beforeInsertInsCode(){
let response = await fetch("/ajax/beforeInsertInsCode");
let res = await response.json();
let beforeInscode = res.prodInstructCode;
let ucode = document.querySelector('#usersCode').value;
let uname = document.querySelector('#usersName').value;

	//화면로딩부터 기본 행 추가
	piInsert.appendRow({prodInstructCode: beforeInscode, prodPlanCode: wplan.getData()[0].prodPlanCode, instructDate: dateFormat(new Date()), usersCode: ucode, usersName: uname});		
};


/* < 생산계획 상세 > */
const piDeInsert = new tui.Grid({
el : document.getElementById('piDeInsert'),
scrollX : false,
scrollY : false,
columns : [
	{
		header : '생산계획상세코드',
		name : 'prodPlanDetailCode',
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
		editor: {
			type: CustomNumberEditor,
			options: {
			}
		},
		formatter: function(price) {
			return priceFormat(price.value);
		}
	},			
],
summary: {
	height: 40,
	position: 'bottom',
	columnContent: {
		prodPlanDetailCode: {
			template: function() {
				return '일일 지시수량 합계';
			}, 
		},
		instructCnt: {
			template: function(value) {
				return priceFormat(value.sum);
			}, 
		}
	},
}		
});

//===========================================================================
//생산계획 => 생산지시
wplan.on("click", (e) => {
	//console.log(e);
	let wplcode = wplan.getValue(e.rowKey, "prodPlanCode");
	piInsert.setValue(0, "prodPlanCode", wplcode);
});

//생산요청 상세 => 생산계획 상세 (check된 값)
wplanD.on('checkAll', function() {
	let checked = wplanD.getCheckedRows();
	piDeInsert.resetData(checked);
});
wplanD.on('check', function(e) {
	let checked = wplanD.getRow(e.rowKey);
	piDeInsert.appendRow(checked);
});
wplanD.on('uncheckAll', function() {
	let checked = wplanD.getCheckedRows();
	piDeInsert.resetData(checked);
});
wplanD.on('uncheck', function(e) {
	let delCode = wplanD.getValue(e.rowKey, 'prodPlanDetailCode');
	let delRow = piDeInsert.getData();

	console.log(delRow);
	for(let i = 0; i < delRow.length; i++) {
		if(delRow[i].prodPlanDetailCode == delCode) {
			delRow.splice(i, 1);
			piDeInsert.resetData(delRow);
		}
	}
});

//지시등록 유효성
function beforeInsertCheck() {
	const alert = document.getElementById('alertMsg');
	
	//지시상세
	if(piDeInsert.getData().length == 0) {
		alert.innerHTML = '<span style="color:red">※</span> 지시상세 내용을 입력하세요';
		return false;
	}

	//지시수량
	for(let i=0; i < piDeInsert.getData().length; i++) {
		let inputins = piDeInsert.getData()[i].instructCnt;
		if(inputins == null || inputins == '') {
			alert.innerHTML = '<span style="color:red">※</span> 지시수량을 입력하세요.';
			return false;
		}
	}

	//생산계획코드
	let picode = piInsert.getData()[0].prodPlanCode;
	if(picode == null || picode == '') {
		alert.innerHTML = '<span style="color:red">※</span> 생산계획코드를 입력하세요.';
		return false;
	}

	//설비상태 체크
	let procEqm = eqmOpr.getData();
	for(let i = 0; i < procEqm.length; i++) {
		
		if(procEqm[i].eqmStatus != 'ES1') {
			let checkEqm = procEqm[i].eqmName;
			alert.innerHTML = `<span style="color:red">※</span> ${checkEqm}의 설비상태를 확인하세요`;
			return false;
		}
	}

	alert.innerHTML = '';
	return true;

};

//생산지시+상세지시 등록
async function insertInstruct() {

	piInsert.blur(); //값 등록 후 enter 안 쳐도 값 들어가도록
	piDeInsert.blur();

	if(!beforeInsertCheck()){
		return;
	}

		
	const pi = piInsert.getModifiedRows().createdRows
	const piDeAll = piDeInsert.getData();
	let param = {...pi[0], pidvo: piDeAll} //생산지시1건(배열로 들어와서 펼침연산자로 풀어서), list<detailvo>의 필드명(여러건) 
	
	let response = await fetch('ajax/insertProdInstruct', {
		method: 'post',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	})
	let res = await response.json();
	let result = res.prodInstructCode; //값 있는 지 확인(vo로 넘겨받음)
	
	// SweetAlert
	if(result != null){ //vo로 넘겨받음
		Swal.fire({
			position: "center",
			icon: "success",
			title: "생산지시 등록 완료",
			showConfirmButton: false,
			timer: 2000
		})
		window.setTimeout(function() {
			location.href = '/process'
		}, 1000);
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "생산지시 등록 실패",
			showConfirmButton: false,
			timer: 2000
		});
	};
	
};

//==============================================================================
// 설비상태
class ColumnConverter1 {
	constructor(props) {
			const el = document.createElement('div');

			this.el = el;
			this.render(props);
	}
	render(props) {
			this.el.innerText = converter1(props.formattedValue);
	}
	getElement() {
			return this.el;
	}
}

function converter1(value){
	let result;
	if(value == "ES1") {
			result = "정상";
	} else if(value == "ES2") {
			result = "고장";
	} else if(value == "ES3") {
			result = "점검중";
	} else if(value == "ES4") {
			result = "수리중";
	} else if(value == "ES5") {
			result = "폐기";
	}
	return result;
}


// 가동현황
class ColumnConverter2 {
	constructor(props) {
			const el = document.createElement('div');

			this.el = el;
			this.render(props);
	}
	render(props) {
		this.el.innerText = converter2(props.formattedValue);
	}
	getElement() {
			return this.el;
	}
}

function converter2(value){
	let result;
	if(value == "FO1") {
			result = "대기";
	} else if(value == "FO2") {
			result = "가동중";
	} else if(value == "FO3") {
			result = "전원꺼짐";
	}
	return result;
}

/* < 공정에 사용되는 설비 상태 > */
const eqmOpr = new tui.Grid({
	el: document.getElementById('eqmOpr'),
	scrollX: false,
	scrollY: true,
	bodyHeight: 200,
	rowHeaders: ['rowNum'],
	columns: [
		{
			header : '설비코드',
			name : 'eqmCode',
			align: 'center'
		},
		{
			header : '설비명',
			name : 'eqmName',
			align: 'center'
		},
		{
			header: '설비상태',
			name: 'eqmStatus',
			align: 'center',
			renderer: {type: ColumnConverter1}
		}
	]
});


// 설비조회(ajax)
async function getEqmOpr(){
	await fetch("/ajax/procEqmInfo")
	.then(res => res.json())
	.then(res => {
		console.log(res);
		eqmOpr.resetData(res);
	})
};

/* < 설비명별 모든 설비 상태 > */
const eqmAll = new tui.Grid({
	el: document.getElementById('eqmAll'),
	scrollX: false,
	scrollY: true,
	bodyHeight: 200,
	rowHeaders: ['rowNum'],
	columns: [
		{
			header : '설비코드',
			name : 'eqmCode',
			align: 'center'
		},
		{
			header : '설비명',
			name : 'eqmName',
			align: 'center'
		},
		{
			header: '설비상태',
			name: 'eqmStatus',
			align: 'center',
			renderer: {type: ColumnConverter1}
		},			
		{
				header: '가동현황',
				name: 'oprStatus',
				align: 'center',
				renderer: {type: ColumnConverter2}
		}
	]
});

//공정 등록설비 클릭 시 => 공정별 모든 설비 조회
eqmOpr.on('click', e => {
	let searchEqmName = eqmOpr.getValue(e.rowKey, "eqmName");
	//console.log(searchEqmName);
	getEqmAll(searchEqmName);
});

async function getEqmAll(serachEqmName){
	let response = await fetch(`/ajax/eqmAllInfo?eqmName=${serachEqmName}`)
	let res = await response.json();
	eqmAll.resetData(res);
};

//설비변경 유효성
function beforeChangeCheck() {
	const alert = document.getElementById('alertMsg2');
	
	const row = eqmOpr.getFocusedCell().rowKey;
	const info = eqmOpr.getData()[row];
	const row2 = eqmAll.getFocusedCell().rowKey;
	const changeInfo = eqmAll.getData()[row2];

	if(row == null || row2 == null) {
		alert.innerHTML = '<span style="color:red">※</span> 변경할 설비를 선택하세요';
		return false;
	}

	if(changeInfo.eqmStatus != 'ES1') {
		alert.innerHTML = '<span style="color:red">※</span> 변경할 설비상태를 확인하세요';
		return false;
	}

	if(changeInfo.eqmCode == info.eqmCode) {
		alert.innerHTML = '<span style="color:red">※</span> 이미 등록되어있는 설비입니다';
		return false;
	}

	alert.innerHTML = '';
	return true;

};

//공정사용 설비 변경
async function updateProcEqm() {

	if(!beforeChangeCheck()){
		return;
	}
	const row = eqmOpr.getFocusedCell().rowKey;
	const pcode = eqmOpr.getData()[row].procCode;
	const row2 = eqmAll.getFocusedCell().rowKey;
	const ecode = eqmAll.getData()[row2].eqmCode;

	const changeInfo = {procCode: pcode, eqmCode: ecode};

	let response = await fetch('ajax/updateProcEqm', {
		method: 'post',
		headers: jsonHeaders,
		body : JSON.stringify(changeInfo)
	});
	let res = await response.json();

	if(res == 1){ 
		Swal.fire({
			position: "center",
			icon: "success",
			title: "공정 사용설비 변경 완료",
			showConfirmButton: false,
			timer: 2000
		});
		getEqmOpr();
		eqmAll.resetData([]);

	} else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "공정 사용설비 변경 실패",
			showConfirmButton: false,
			timer: 2000
		});
	};
};