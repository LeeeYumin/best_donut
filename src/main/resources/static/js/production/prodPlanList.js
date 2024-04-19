getProdPlanList();

// 생산관리자 권한 확인
if(document.querySelector('#auth').innerHTML != '1'){
	document.querySelector('#deleteBtn').setAttribute('style', 'display : none;');
	document.querySelector('#updateBtn').setAttribute('style', 'display : none;');
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

		/* < 생산계획 목록 > */
		const plList = new tui.Grid({
			el : document.getElementById('plList'),
			bodyHeight: 200,
			scrollX : false,
			scrollY : true,
			
			columns : [
				{
					header : '생산계획코드',
					name : 'prodPlanCode',
					align: 'center'
				}, 
				{
					header : '생산계획일자',
					name : 'planDate',
					align: 'center'
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
		
		// 생산계획 목록 조회(ajax) -검색포함
		async function getProdPlanList(){

			const searchStartDate = document.getElementById('searchStartDate').value;
			const searchEndDate = document.getElementById('searchEndDate').value;
			const prodPlanCode = document.getElementById('prodPlanCode').value;

			const obj = {searchStartDate, searchEndDate, prodPlanCode};
			console.log(obj);
			
			const data = {
				method: 'POST',
				headers: jsonHeaders,
				body : JSON.stringify(obj)
			};

			await fetch("/ajax/prodPlanList", data)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				plList.resetData(res);
			})
		};

		//검색버튼
		document.getElementById('searchBtn').addEventListener('click', getProdPlanList);
		document.getElementById('prodPlanCode').addEventListener('keyup', (e) => { //*확인하기
			if (e.keyCode == 13) {
				getProdPlanList();
			}
		})

		//초기화버튼
		document.getElementById('resetBtn').addEventListener('click', function() {
			document.getElementById('searchStartDate').value = '';
			document.getElementById('searchEndDate').value = '';
			document.getElementById('prodPlanCode').value = '';
			plList.resetData([]);
			getProdPlanList();
		});
		
		/* < 생산계획 상세 목록 > */
		const plAll = new tui.Grid({
			el : document.getElementById('plAll'),
			scrollX : false,
			scrollY : false,
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
					editor: 'text',
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
					formatter: function(price) {
						return priceFormat(price.value);
					}
				},
			],
			summary: {
				//align: 'right',
				height: 40,
				position: 'bottom',
				columnContent: {
					prodPlanDetailCode: {
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

		//생산계획 클릭 시 => 아래 생산계획상세내용 출력
		plList.on('click', e => {
			let status = plList.getValue(e.rowKey, "prodPlanStatus");
			let plCode = plList.getValue(e.rowKey, "prodPlanCode");

			//계획상세목록
			getProdPlanAll(plCode);

			//계획상태가 미지시이면 수정가능하게
			if(status == 'LS1') {
				plAll.enableColumn('fixCnt');

			}else { //아니면 수정불가
				plAll.disableColumn('fixCnt');
			}		
		});
		
		//계획상세 목록
 		function getProdPlanAll(plCode){
			fetch(`/ajax/prodPlanAll?prodPlanCode=${plCode}`)
			.then(res => res.json())
			.then(res => {
				//console.log(res);
	
				plAll.resetData(res);
			})
		};

		//수정 시 변경 값 계산
		plAll.on('afterChange', e => {
			let row = plAll.getRow(e.changes[0].rowKey);
			let fixCnt = parseInt(row.fixCnt);
			let reqCnt = parseInt(row.reqCnt);

			let planCnt = parseInt(fixCnt + reqCnt);
			//console.log(planCnt)
			let notInstructCnt = planCnt;

			plAll.setValue(row.rowKey, 'planCnt', planCnt);
			plAll.setValue(row.rowKey, 'notInstructCnt', notInstructCnt);
		})

		//수정 유효성
		function beforeUpdateCheck() {
			const alert = document.getElementById('alertMsg2');

			const updateCnt = plAll.getModifiedRows().updatedRows;

			if(updateCnt.length == 0) {
				alert.innerHTML = '<span style="color:red">※</span> 수정할 고정수량을 입력하세요';
				return false;
			}

			alert.innerHTML = '';
			return true;
		};
		
		//생산계획 상세 수정하기
		function updatePlanDetail() {

			if(!beforeUpdateCheck()){
				return;
			}

			plAll.blur();
			const plDe = plAll.getModifiedRows().updatedRows
			console.log(plDe);
			
			const row = plList.getFocusedCell().rowKey;
			const plcode = plList.getValue(row, "prodPlanCode");

			fetch('ajax/updateProdPlanDetail', {
				method: 'post',
				headers: jsonHeaders,
				body : JSON.stringify(plDe)
			})
			.then(res => res.json())
			.then(res => {

				// console.log(res);
				// if(res == 1) {
				// 	alert('수정되었습니다.');
				// }else if(res) {
				// 	alert('수정 중 오류 발생');
				// }

					if(res == 1){ 
						Swal.fire({
							position: "center",
							icon: "success",
							title: "생산계획 수정 완료",
							showConfirmButton: false,
							timer: 2000
						});
						getProdPlanAll(plcode);
						//plDeInsert.resetData([]);

					} else {
						Swal.fire({
							position: "center",
							icon: "error",
							title: "생산계획 수정 실패",
							showConfirmButton: false,
							timer: 2000
						});
					};
			});
		};

		//삭제 유효성
		function beforeDelCheck() {
			const alert = document.getElementById('alertMsg'); //삭제
			
			const row = plList.getFocusedCell().rowKey;

			if(row == null) {
				alert.innerHTML = '<span style="color:red">※</span> 삭제할 계획을 선택하세요';
				return false;
			}

			alert.innerHTML = '';
			return true;
		};
		//미지시 생산계획 삭제
		function deletePlan() {
			
			if(!beforeDelCheck()){
				return;
			}
			
			let row = plList.getFocusedCell().rowKey;
			let plan = plList.getData()[row];

			//계획상세
			plan.dvo =  plAll.getData();

			if(plan.prodPlanStatus == 'LS1') {

				fetch('ajax/deleteProdPlan', {
					method: 'post',
					headers: jsonHeaders,
					body : JSON.stringify(plan)
				})
				.then(res => res.json())
				.then(res => {
					console.log(res);

					// SweetAlert
					if(res.result == 1){ //controller에서 "result"로 값 넘김
						Swal.fire({
							position: "center",
							icon: "success",
							title: "생산계획 삭제 완료",
							showConfirmButton: false,
							timer: 2000
						});
						getProdPlanList();
						plAll.resetData([]);

					} else {
						Swal.fire({
							position: "center",
							icon: "error",
							title: "생산계획 삭제 실패",
							showConfirmButton: false,
							timer: 2000
						});
					};

				});

			} else {
				//alert('지시등록된 건으로 삭제 불가');
				Swal.fire({
					position: "center",
					icon: "error",
					title: "지시등록된 건으로 삭제 불가",
					showConfirmButton: false,
					timer: 2000
				});
			}
		};


		

		


		