getWeeklyPlan();
getEqmCheck();

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
		//el.max = 1000;
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
};

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
		],
		summary: {
			//align: 'right',
			height: 40,
			position: 'bottom',
			columnContent: {
				prodPlanDetailCode: {
					template: function() {
						return '주간 총 계획수량';
					}, 
				},
				planCnt: {
					//align: 'right',
					template: function(value) {
						return priceFormat(value.sum);
					}, 
				}
			},
		}
	});

	// 주간생산계획조회(ajax)
	async function getWeeklyPlan(){
		await fetch("/ajax/weeklyPlan")
		.then(res => res.json())
		.then(res => {
			console.log(res);

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
					//formatter: dateFormat //공통함수
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
		piInsert.appendRow({instructDate: dateFormat(new Date())});
		
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
					editor: {
						type: CustomNumberEditor,
						options: {
						}
					},
					formatter: function(price) {
						return priceFormat(price.value);
					},
				},			
			],
			summary: {
				//align: 'right',
				height: 40,
				position: 'bottom',
				columnContent: {
					prodInstructDetailCode: {
						template: function() {
							return '지시수량 합계';
						}, 
					},
					instructCnt: {
						//align: 'right',
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
				let delRow = piDeInsert.getData();

				console.log(delRow);
				for(let i = 0; i < delRow.length; i++) {
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
				//let instructCnt = parseInt(row.instructCnt);
				
				let beforeCnt = wplanD.getData();
				
				for(let i = 0; i < beforeCnt.length; i++) {
					if(wplanD.beforeCnt[i].prodPlanDetailCode == plDeCode) {
						let num = i;
						
						let beforeNotIns = beforeCnt[i].notInstructCnt; //기존 미지시수량
						let beforeOkIns = beforeCnt[i].instructCnt; //기존 지시수량

						let

						//let notIns = wplanD.getData()[i].planCnt - instructCnt
						
						
						//입력 지시수량이 계획수량보다 클 경우 => 알림 후 계획수량으로 입력
						if(row.instructCnt > wplanD.getData()[i].planCnt) {
							document.getElementById('alertMsg').innerHTML = '<span style="color:red">※</span> 지시수량이 계획수량을 초과하여 계획수량이 입력됩니다.';
							
							let plCnt = parseInt(wplanD.getData()[i].planCnt);
							piDeInsert.setValue(row.rowKey, 'instructCnt', plCnt);
							wplanD.setValue(num, 'instructDoneCnt', plCnt);

							let insD =  parseInt(wplanD.getData()[i].instructDoneCnt);
							let done = parseInt(plCnt - insD);

							wplanD.setValue(num, 'notInstructCnt', done);
							
							setTimeout(() => {
								document.getElementById('alertMsg').innerText = '';
							}, 4000);

							return;

						} else {
							wplanD.setValue(num, 'instructDoneCnt', instructCnt);
							wplanD.setValue(num, 'notInstructCnt', notIns);
						}
					}
				}
			});
			// piDeInsert.on('afterChange', e => {
			// 	let row = piDeInsert.getRow(e.changes[0].rowKey);
				
			// 	let plDeCode = row.prodPlanDetailCode;
			// 	let instructCnt = parseInt(row.instructCnt);
				
			// 	for(let i = 0; i < wplanD.getData().length; i++) {
			// 		if(wplanD.getData()[i].prodPlanDetailCode == plDeCode) {
			// 			let num = i;
			// 			let notIns = wplanD.getData()[i].planCnt - instructCnt
						
						
			// 			//입력 지시수량이 계획수량보다 클 경우 => 알림 후 계획수량으로 입력
			// 			if(row.instructCnt > wplanD.getData()[i].planCnt) {
			// 				document.getElementById('alertMsg').innerHTML = '<span style="color:red">※</span> 지시수량이 계획수량을 초과하여 계획수량이 입력됩니다.';
							
			// 				let plCnt = parseInt(wplanD.getData()[i].planCnt);
			// 				piDeInsert.setValue(row.rowKey, 'instructCnt', plCnt);
			// 				wplanD.setValue(num, 'instructDoneCnt', plCnt);

			// 				let insD =  parseInt(wplanD.getData()[i].instructDoneCnt);
			// 				let done = parseInt(plCnt - insD);

			// 				wplanD.setValue(num, 'notInstructCnt', done);
							
			// 				setTimeout(() => {
			// 					document.getElementById('alertMsg').innerText = '';
			// 				}, 4000);

			// 				return;

			// 			} else {
			// 				wplanD.setValue(num, 'instructDoneCnt', instructCnt);
			// 				wplanD.setValue(num, 'notInstructCnt', notIns);
			// 			}
			// 		}
			// 	}
			// });


			function beforeInsertCheck() {
				const alert = document.getElementById('alertMsg');
				
				//지시상세
				if(piDeInsert.getData().length == 0) {
					alert.innerHTML = '<span style="color:red">※</span> 지시상세 내용을 입력하세요.';
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

				//담당자 ( 코드?있으면 확인 후 수정하기 )
				if(piInsert.getData()[0].usersCode != 'USE00003') {
					alert.innerHTML = '<span style="color:red">※</span> 생산관리자만 등록 가능';
					return false;
				}

				alert.innerHTML = '';
				return true;

			}
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

				await fetch('ajax/insertProdInstruct', {
					method: 'post',
					headers: jsonHeaders,
					body : JSON.stringify(param)
				})
				.then(res => res.json())
				.then(res => {
					//console.log(res);
					if(res.prodInstructCode != null) { //vo로 넘겨받음
						updateAfterInstruct();
						alert('생산지시가 등록되었습니다.');
						saveRes(res);
					} else {
						alert('등록 중 오류 발생');
					}
				})
			}

			//등록응답 (그리드에 입력된 모든 정보 비우기)
			function saveRes(res) {
				console.log(res);

				piInsert.setValue(0,"prodPlanCode",'');
				piDeInsert.resetData([]);
			}

			//생산계획 상세 수정하기
			async function updateAfterInstruct() {
				const wplDe = wplanD.getModifiedRows().updatedRows
				console.log(wplDe);
				
				await fetch('ajax/updateAfterInstruct', {
					method: 'post',
					headers: jsonHeaders,
					body : JSON.stringify(wplDe)
				})
				.then(res => res.json())
				.then(res => {
					console.log(res);
				})
			}

//=======================================================
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

			const eqmCheck = new tui.Grid({
				el: document.getElementById('eqmCheck'),
				scrollX: false,
				scrollY: true,
				bodyHeight: 200,
				rowHeaders: ['rowNum'],
				columns: [
					{
						header: '설비코드',
						name: 'eqmCode',
						sortingType: 'asc',
						sortable: true,
						align: 'center'
					},
					{
						header: '설비명',
						name: 'eqmName',
						sortingType: 'asc',
						align: 'center'
					},
					{
						header: '설비상태',
						name: 'eqmStatus',
						sortable: true,
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

			// 설비조회(ajax)
			async function getEqmCheck(){
				await fetch("/ajax/eqmCheck")
				.then(res => res.json())
				.then(res => {
					//console.log(res);
					eqmCheck.resetData(res);
				})
			};



