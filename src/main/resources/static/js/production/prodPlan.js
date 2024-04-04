getProdReq();
		
			/* < 생산계획 > */
			
			//생산계획 등록
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
						//editor: 'text'
					},
					{
						header : '생산계획일자',
						name : 'prodPlanDate',
						align: 'center',
						editor: 'text',
						formatter: dateFormat //공통함수
					},
					{
						header : '담당자',
						name : 'usersCode',
						align: 'center',
						//editor: 'text'
					}
				]
			});
      //화면로딩부터 행 추가되도록
			plInsert.appendRow({prodPlanDate: new Date()});
			
			/* < 생산계획 상세 > */
			const plDeInsert = new tui.Grid({
				el : document.getElementById('plDeInsert'),
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
						align: 'center'
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
						defaultValue: 1400,
            formatter: function(price) {
              return priceFormat(price.value);
            },

						editor: 'text'
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
					},
					{
						header : '미지시수량',
						name : 'notInstructCnt',
						align: 'center',
            formatter: function(price) {
              return priceFormat(price.value);
            }
					},
          {
						header : '지시수량',
						name : 'instructDoneCnt',
						align: 'center',
						defaultValue: 0,
            formatter: function(price) {
              return priceFormat(price.value);
            }
					}
				]
			});
			
			
			//생산계획 상세 등록 행추가
			let addRowBtn = document.getElementById('addRowBtn');
			addRowBtn.addEventListener('click', function() {
	    		/* plInsert.appendRow({prodPlanDate: new Date()}); */
				plDeInsert.appendRow({});
	    		
			});
      //행 삭제
			let delRowBtn = document.getElementById('delRowBtn');
			delRowBtn.addEventListener('click', function() {
				plDeInsert.removeRow({});
			});

			//고정수량 + 요청수량 = 계획수량
			//                   = 미지시수량
			plDeInsert.on('afterChange', e => {
				//console.log(e.changes);

				let changeAll = plDeInsert.getRow(e.changes);
				console.log(changeAll);

				let fixCnt = changeAll.fixCnt;
				let reqCnt = changeAll.reqCnt;

				let planCnt = fixCnt + reqCnt;

				plDeInsert.setValue(changeAll, "planCnt", planCnt);

			})
			//생산요청상세 => 생산계획상세 폼에 입력

			//생산요청코드 => 생산계획입력 폼에
		/* 	let addInputBtn = document.getElmentById('addInputBtn');
			addInputBtn.addEventListener('click', function() {
				plreqD.getCheckedRows();
			}) */
			
			
			//=========================================================================
			
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
						align: 'center',
						formatter: dateFormat
					},
					{
						header : '생산요청코드',
						name : 'prodReqCode',
						align: 'center'
					}, 
					{
						header : '총 요청수량',
						name : 'totalReqCnt',
						align: 'center'
					}, 
					{
						header : '담당자',
						name : 'usersCode',
						align: 'center'
					}
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
						align: 'center'
					}
				]
			});
			
			// 생산요청조회(ajax)
			async function getProdReq(){
				await fetch("/ajax/prodReq")
				.then(res => res.json())
				.then(res => {
					console.log(res);

					plreq.resetData(res.prodReq); //ServiceImpl에서 넘겨 준 변수명
					plreqD.resetData(res.prodReqDe);
				})
			};
			
			
			//============================================================
			//생산요청 => 생산계획
			plreq.on("click", (e) => {
				console.log(e);
				let prcode = plreq.getValue(e.rowKey, "prodReqCode");
				plInsert.setValue(0, "prodReqCode", prcode) //setValue(0, "prodReqCode", prcode, false) false가 기본값
			})

      //생산요청 상세 => 생산계획 상세 (check된 값)
      let addInputBtn = document.getElementById('addInputBtn');
      addInputBtn.addEventListener('click', function() {
        let checked = plreqD.getCheckedRows();
				console.log(checked);
        plDeInsert.appendRows(checked);
				
      })



			  