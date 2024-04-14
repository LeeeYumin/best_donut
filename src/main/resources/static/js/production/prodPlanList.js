getProdPlanList()

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
		
		//초기화버튼
		document.getElementById('resetBtn').addEventListener('click', function() {
			document.getElementById('searchStartDate').value = '';
			document.getElementById('searchEndDate').value = '';
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

		//생산계획 클릭 시 아래 생산계획상세내용 출력
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
		})
		
 		async function getProdPlanAll(plCode){
			await fetch(`/ajax/prodPlanAll?prodPlanCode=${plCode}`)
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

		//생산계획 상세 수정하기
		async function updatePlanDetail() {
			plAll.blur();
			const plDe = plAll.getModifiedRows().updatedRows
			console.log(plDe);
			

			await fetch('ajax/updateProdPlanDetail', {
				method: 'post',
				headers: jsonHeaders,
				body : JSON.stringify(plDe)
			})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if(res == 1) {
					alert('수정되었습니다.');
				}else if(res) {
					alert('수정 중 오류 발생');
				}
			})
		}

		// //생산계획 상태 미지시일 경우에만 삭제하기
		// plList.on('click', e => {
		// 	const status = plList.getValue(e.rowKey,"prodPlanStatus");
		// 	console.log(status);

		// 	if(status == 'LS1') {

		// 	}
		// });


		async function deletePlan() {
			
			let row = plList.getFocusedCell().rowKey;
			let plan = plList.getData()[row];

			//계획상세
			plan.dvo =  plAll.getData();

			if(plan.prodPlanStatus == 'LS1') {
				await fetch('ajax/deleteProdPlan', {
					method: 'post',
					headers: jsonHeaders,
					body : JSON.stringify(plan)
				})
				.then(res => res.json())
				.then(res => {
					console.log(res);
					if(res.result == 1) { //controller에서 "result"로 값 넘김
						alert('삭제되었습니다.');
						getProdPlanList();
						plAll.resetData([]);

					}else {
						alert('삭제 중 오류 발생');
					}
				})
			} else {
				alert('지시등록된 건으로 삭제 불가');
			}
		}
		//삭제응답 (그리드에 입력된 모든 정보 비우기)
		// function saveRes(res) {
		// 	plDeInsert.resetData([]);
		// 	plreq.resetData([]);
		// 	plreqD.resetData([]);
		// }


		

		


		