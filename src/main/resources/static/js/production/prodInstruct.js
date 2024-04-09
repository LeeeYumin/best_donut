getWeeklyPlan();

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
	}

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
				//editor: 'text',
				_attributes: {
					className: {
						column: 'plan-cnt-color'
					}
				},
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
			},
			{
				header : '지시수량',
				name : 'instructDoneCnt',
				align: 'center',
				formatter: function(price) {
					return priceFormat(price.value);
				},
			},
		]
	});

	// 주간생산계획조회(ajax)
	async function getWeeklyPlan(){
		await fetch("/ajax/weeklyPlan")
		.then(res => res.json())
		.then(res => {
			//console.log(res);

			wplan.resetData(res.weeklyPlan); //ServiceImpl에서 넘겨 준 변수명
			wplanD.resetData(res.weeklyPlanDe);
		})
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
					editor: 'text',
					formatter: dateFormat //공통함수
				},
				{
					header : '담당자',
					name : 'usersCode',
					align: 'center',
					editor: 'text'
				}
			]
		});

		//화면로딩부터 행 추가되도록
		piInsert.appendRow({instructDate: new Date()});
		
		/* < 생산계획 상세 > */
		const piDeInsert = new tui.Grid({
			el : document.getElementById('piDeInsert'),
			scrollX : false,
			scrollY : false,
			columns : [
				{
					header : '생산지시상세코드',
					name : 'prodInstructDetailCode',
					align: 'center'
				},
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
					formatter: function(price) {
						return priceFormat(price.value);
					},
					editor: 'text'
				},				
			],	
		});
		
		//===========================================================================
			//생산계획 => 생산지시
			wplan.on("click", (e) => {
				//console.log(e);
				let wplcode = wplan.getValue(e.rowKey, "prodPlanCode");
				piInsert.setValue(0, "prodPlanCode", wplcode) //setValue(0, "prodReqCode", prcode, false) false가 기본값
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
				let delRow = piDeInsert.getData()

				for(let i = 0; i < piDeInsert.getData().length; i++) {
					if(delRow[i].prodPlanDetailCode == delCode) {
						delRow.splice(i, 1);
						piDeInsert.resetData(delRow);
					}
				}
			});

			//생산지시 그리드의 지시수량 입력 시 => 위 생산계획 그리드 지시수량 & 미지시수량 값 변경
			piDeInsert.on('afterChange', e => {
				let row = piDeInsert.getRow(e.changes[0].rowKey);
				
				let plDeCode = row.prodPlanDetailCode;
				let instructCnt = parseInt(row.instructCnt);
				
				for(let i = 0; i < wplanD.getData().length; i++) {
					if(wplanD.getData()[i].prodPlanDetailCode == plDeCode) {
						let num = i;
						let notIns = wplanD.getData()[i].notInstructCnt - instructCnt
						
						
						//입력 지시수량이 계획수량보다 클 경우 => 알림 후 계획수량으로 입력
						let plCnt = wplanD.getData()[i].planCnt;

						if(row.instructCnt > plCnt) {
							document.getElementById('alertMsg').innerHTML = '<span style="color:red">※</span> 지시수량이 계획수량을 초과하여 계획수량이 입력됩니다.';
							piDeInsert.setValue(row.rowKey, 'instructCnt', plCnt);
							
							setTimeout(() => {
								document.getElementById('alertMsg').innerText = '';
							}, 4000);

						} else {
							wplanD.setValue(num, 'instructDoneCnt', instructCnt);
							wplanD.setValue(num, 'notInstructCnt', notIns);
						}
					}
				}
			});



