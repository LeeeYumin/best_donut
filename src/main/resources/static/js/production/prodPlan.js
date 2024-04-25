getProdReq();

class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 0;
		//el.max = 1000;
		el.style.width = '100%';
		el.step = 100;
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
}


//없음 '-'표시
class NullFormat {
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
};


/* < 생산요청 > */
const plreq = new tui.Grid({
	el : document.getElementById('plreq'),
	scrollX : false,
	scrollY : false,
	bodyHeight: 40,
	minBodyHeight: 40,
	columns : [
		{
			header : '생산요청일자',
			name : 'reqDate',
			align: 'center'
		},
		{
			header : '생산요청코드',
			name : 'prodReqCode',
			align: 'center'
		}, 
		{
			header : '총 요청수량',
			name : 'totalReqCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
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
		},
	]
});

/* < 생산요청 상세 > */
const plreqD = new tui.Grid({
	el : document.getElementById('plreqD'),
	scrollX : false,
	scrollY : false,
	rowHeaders: ['checkbox'],
	columns : [
		{
			header : '생산요청상세코드',
			name : 'prodReqDetailCode',
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
			header : '수량',
			name : 'reqCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}
	]
});

// 생산요청조회(ajax)
async function getProdReq(){
	let response = await fetch("/ajax/prodReq");
	let res = await response.json();
	
	beforeInsertPlanCode(); //기본행

		//생산요청 없으면 화면에 X
		if(res.prodReq.length == 0 ) {
			document.querySelector('.show-list').style.display = 'none';
			return; 
		} else {					
			plreq.resetData(res.prodReq); //ServiceImpl에서 넘겨 준 변수명
			plreqD.resetData(res.prodReqDe);
		}	

};
//=============================================================================		
/* < 생산계획 > */
//등록
const plInsert = new tui.Grid({
	el : document.getElementById('plInsert'),
	scrollX : false,
	scrollY : false,
	bodyHeight: 40,
	minBodyHeight: 40,
	columns : [
		{
			header : '생산계획코드',
			name : 'prodPlanCode',
			align: 'center',
		},
		{
			header : '생산요청코드',
			name : 'prodReqCode',
			align: 'center',
			renderer: {type: NullFormat}
		},
		{
			header : '생산계획일자',
			name : 'planDate',
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
		},
	]
});
	
/* < 생산계획 상세 > */
const plDeInsert = new tui.Grid({
	el : document.getElementById('plDeInsert'),
	scrollX : false,
	scrollY : false,
	columns : [
		{
			header : '생산요청상세코드',
			name : 'prodReqDetailCode',
			align: 'center',
			renderer: {type: NullFormat}
		},
		{
			header : '제품코드',
			name : 'productCode',
			align: 'center',
			editor: 'text'
		},
		{
			header : '고정수량',
			name : 'fixCnt',
			align: 'center',
			editor: {
				type: CustomNumberEditor,
				options: {
				}
			},
			formatter: function(price) {
				return priceFormat(price.value);
			},
		},
		{
			header : '요청수량',
			name : 'reqCnt',
			align: 'center',
			defaultValue: 0,
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
		{
			header : '계획수량',
			name : 'planCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}
							
	],
	summary: {
		//align: 'right',
		height: 40,
		position: 'bottom',
		columnContent: {
			prodReqDetailCode: {
				template: function() {
					return '총 계획수량 합계';
				}, 
			},
			planCnt: {
				//align: 'right',
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
		},
	}	
});

//등록 전 생산계획코드 미리 불러오기
async function beforeInsertPlanCode(){
	let response = await fetch("/ajax/beforeInsertPlanCode")
	let res = await response.json();
	let beforeplcode = res.prodPlanCode;
	let ucode = document.querySelector('#usersCode').value;
	let uname = document.querySelector('#usersName').value;

	//화면로딩부터 기본 행 추가
	let reqCode = null;
	if (plreq.getData().length != 0) {
		reqCode = plreq.getData()[0].prodReqCode;
	} else {
		reqCode = '';
		plDeInsert.appendRow({prodReqDetailCode: '', fixCnt: 1400, reqCnt: 0, planCnt: 1400});
	}
	
	plInsert.appendRow({prodPlanCode: beforeplcode, prodReqCode: reqCode, planDate: dateFormat(new Date()), usersCode: ucode, usersName: uname});
};


//생산계획 상세 등록 행추가
let addRowBtn = document.getElementById('addRowBtn');
		addRowBtn.addEventListener('click', function() {
		plDeInsert.appendRow({fixCnt: 1400, reqCnt: 0, planCnt: 1400});
});

//고정수량 변경 시 계획수량 자동계산
plDeInsert.on('afterChange', e => {
	let row = plDeInsert.getRow(e.changes[0].rowKey);
	let plCnt = parseInt(row.fixCnt) + parseInt(row.reqCnt);
	plDeInsert.setValue(row.rowKey, 'planCnt', plCnt);
});

//행 삭제
let delRowBtn = document.getElementById('delRowBtn');
delRowBtn.addEventListener('click', function() {
	let rowKey = plDeInsert.getFocusedCell().rowKey;
	if (rowKey != null) {
		plDeInsert.removeRow(rowKey);
		return;
	}
	//
	if(rowKey == null) {
		let lastRow = plDeInsert.getData().length-1;
		console.log(rowKey);
		console.log(lastRow);

		plDeInsert.removeRow(lastRow);
	}
});

//============================================================
//생산요청 => 생산계획
plreq.on("click", (e) => {
	let prcode = plreq.getValue(e.rowKey, "prodReqCode");
	plInsert.setValue(0, "prodReqCode", prcode)
});

/* CHECK */
//생산요청 상세 => 생산계획 상세 (check된 값)
plreqD.on('checkAll', function() {
	let checked = plreqD.getCheckedRows();
	for(let i=0; i < checked.length; i++) {
		checked[i].fixCnt = 1400;
		let planCnt = checked[i].fixCnt + checked[i].reqCnt; //고정+요청 = 계획수량
		checked[i].planCnt = planCnt;
	}
	plDeInsert.resetData(checked);
});

plreqD.on('check', function(e) {
	let checked = plreqD.getRow(e.rowKey);
	checked.fixCnt = 1400; //고정수량
	
	let planCnt = checked.fixCnt + checked.reqCnt; //고정+요청 = 계획수량
	checked.planCnt = planCnt;

	plDeInsert.appendRow(checked);
});

plreqD.on('uncheckAll', function() {
	let checked = plreqD.getCheckedRows();
	plDeInsert.resetData(checked);
});

plreqD.on('uncheck', function(e) {
	let checked = plreqD.getCheckedRows();
	plDeInsert.resetData(checked);

	let delCode = plreqD.getValue(e.rowKey, 'prodReqDetailCode');
	let delRow = plDeInsert.getData();

	for(let i = 0; i < delRow.length; i++) {
		if(delRow[i].prodReqDetailCode == delCode) {
			delRow.splice(i, 1);	
		};

		for(let i=0; i < delRow.length; i++) {
			delRow[i].fixCnt = 1400;
			let planCnt = delRow[i].fixCnt + delRow[i].reqCnt; //고정+요청 = 계획수량
			delRow[i].planCnt = planCnt;
		};

		plDeInsert.resetData(delRow);
	};
});

//등록 전 유효성 체크
function beforeInsertCheck() {
	const alert = document.getElementById('alertMsg');
	
	//계획상세
	if(plDeInsert.getData().length == 0) {
		alert.innerHTML = '<span style="color:red">※</span> 계획상세 내용을 입력하세요.';
		return false;
	}
	//제품코드

	for(let i=0; i < plDeInsert.getData().length; i++) {
		let pcode = plDeInsert.getData()[i].productCode;
		if(pcode == null || pcode == '') {
			alert.innerHTML = '<span style="color:red">※</span> 제품코드를 입력하세요.';
			return false;
		}
	}


	alert.innerHTML = '';
	return true;

}

//생산계획+상세계획 등록
async function insertPlan() {

	plInsert.blur(); //값 등록 후 enter 안 쳐도 값 들어가도록
	plDeInsert.blur();


	if(!beforeInsertCheck()){
		return;
	}

	const pl = plInsert.getData();
	const plDeAll = plDeInsert.getData();
	let param = {...pl[0], dvo: plDeAll} //생산계획1건(배열로 들어와서 펼침연산자로 풀어서), planvo에 담은 list<detailvo>의 필드명(여러건) 

	//console.log(param);

	let response = await fetch('ajax/insertProdPlan', {
		method: 'post',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	});
	let res = await response.json();
	let result = res.prodPlanCode; //값 있는 지 확인(vo로 넘겨받음)

	// SweetAlert
	if(result != null){ //vo로 넘겨받음
		Swal.fire({
			position: "center",
			icon: "success",
			title: "생산계획 등록 완료",
			showConfirmButton: false,
			timer: 2000
		})
		window.setTimeout(function() {
			location.href = '/prodPlanList'
		}, 1000);
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "생산계획 등록 실패",
			showConfirmButton: false,
			timer: 2000
		});
	};

};


//제품코드 입력 Modal
let myModal = null;

plDeInsert.on("click", (e) => {
	//console.log(e);
	if(e.columnName == 'productCode') {
		myModal = new bootstrap.Modal('#modalCenter', {
			keyboard: false
		});
		const modalToggle = document.getElementById('modalCenter'); 
		myModal.show(modalToggle);
	}
});

//닫기
function closemodal() {
	const modalToggle = document.getElementById('modalCenter'); 
	myModal.hide(modalToggle);
};

//등록
saveProduct.addEventListener('click', function() {
	let pro = plDeInsert.getFocusedCell().rowKey;
	if (pro != null) {
		closemodal();
		plDeInsert.setValue(pro, "productCode", document.querySelector('input[name="productCode"]:checked').value);
	}
});	  