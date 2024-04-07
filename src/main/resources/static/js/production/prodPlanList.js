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
			scrollX : false,
			scrollY : false,
			
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

			const startDate = document.getElementById('searchStartDate').value;
			const endDate = document.getElementById('searchEndDate').value;
			const planCode = document.getElementById('prodPlanCode').value;

			const obj = {startDate, endDate, planCode};
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
		document.getElementById('searchBtn').addEventListener('click', getProdPlanList());
		
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
					header : '고정수량',
					name : 'fixCnt',
					align: 'center'
				}, 
				{
					header : '요청수량',
					name : 'reqCnt',
					align: 'center'
				},
				{
					header : '계획수량',
					name : 'planCnt',
					align: 'center'
				},
				{
					header : '미지시수량',
					name : 'notInstructCnt',
					align: 'center'
				},
				{
					header : '지시수량',
					name : 'instructDoneCnt',
					align: 'center'
				},
				
			]
		});

		//생산계획 클릭 시 아래 생산계획상세내용 출력
		plList.on("click", (e) => {
			let plCode = plList.getValue(e.rowKey, "prodPlanCode")
			getProdPlanAll(plCode);        
			console.log("prodPlanCode: " + plCode);      
		});
		
 		async function getProdPlanAll(plCode){
			await fetch(`/ajax/prodPlanAll?prodPlanCode=${plCode}`)
			.then(res => res.json())
			.then(res => {
				console.log(res);
	
				plAll.resetData(res);
			})
		};

		


		