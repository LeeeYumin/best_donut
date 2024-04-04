getProdPlanList()

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
					align: 'center'
				},
				{
					header : '상태',
					name : 'prodPlanStatus',
					align: 'center'
				}, 
				{
					header : '담당자',
					name : 'usersCode',
					align: 'center'
				}
			]
		});
		
		// 생산계획 총 목록 조회(ajax)

		async function getProdPlanList(){
			await fetch("/ajax/prodPlanList")
			.then(res => res.json())
			.then(res => {
				console.log(res);

				plList.resetData(res);
			})
		};
		
		//
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
					header : '생산요청코드',
					name : 'prodReqCode',
					align: 'center',
					
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