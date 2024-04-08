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
						name : 'planDate',
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
			plInsert.appendRow({planDate: new Date()});
			
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
						//defaultValue: 1400,
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
					
				],
				
				
			});
			
			
			//생산계획 상세 등록 행추가
			let addRowBtn = document.getElementById('addRowBtn');
         addRowBtn.addEventListener('click', function() {
             /* plInsert.appendRow({planDate: new Date()}); */
            plDeInsert.appendRow({
               fixCnt: 1400, 
               reqCnt: 0,
               //생산요청 추가하고 행추가하면 XXXX
               //planCnt: plDeInsert.getData()[0].fixCnt + plDeInsert.getData()[0].reqCnt,
               //notInstructCnt: plDeInsert.getData()[0].planCnt,
               //instructDoneCnt: 0
						})
			});
			
      //행 삭제
			let delRowBtn = document.getElementById('delRowBtn');
			delRowBtn.addEventListener('click', function() {
				let rowKey = plDeInsert.getFocusedCell().rowKey;
				if (rowKey != null) {
					plDeInsert.removeRow(rowKey);
					//plDeInsert.refreshLayout();
					return;
				}
				//*수정하기
				if(rowKey == null || rowKey == '') {
					let lastRow = plDeInsert.getData().length-1;
					console.log(lastRow);
					console.log(rowKey);
					plDeInsert.removeRow(lastRow);
				}
			});

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
					//console.log(res);

					plreq.resetData(res.prodReq); //ServiceImpl에서 넘겨 준 변수명
					plreqD.resetData(res.prodReqDe);
				})
			};
			
			
			//============================================================
			//생산요청 => 생산계획
			plreq.on("click", (e) => {
				//console.log(e);
				let prcode = plreq.getValue(e.rowKey, "prodReqCode");
				plInsert.setValue(0, "prodReqCode", prcode) //setValue(0, "prodReqCode", prcode, false) false가 기본값
			});

      //생산요청 상세 => 생산계획 상세 (check된 값)
			plreqD.on('checkAll', function() {
				let checked = plreqD.getCheckedRows();
				for(let i=0; i < checked.length; i++) {
					checked[i].fixCnt = 1400;
				}
        plDeInsert.appendRows(checked);
			});
			plreqD.on('check', function() {
				let checked = plreqD.getCheckedRows();
				for(let i=0; i < checked.length; i++) {
					checked[i].fixCnt = 1400;
				}
        plDeInsert.appendRows(checked);
			});
			plreqD.on('uncheckAll', function() {
				let checked = plreqD.getCheckedRows();
				plDeInsert.resetData(checked);
			});
			plreqD.on('uncheck', function() {
				let checked = plreqD.getCheckedRows();
				plDeInsert.resetData(checked);
			});

			//생산계획+상세계획 등록
			async function insertPlan() {

				plInsert.blur(); //값 등록 후 enter 안 쳐도 값 들어가도록
				plDeInsert.blur();

				const pl = plInsert.getModifiedRows().createdRows
				const plDeAll = plDeInsert.getModifiedRows().createdRows
				let param = {...pl[0], dvo: plDeAll} //생산계획1건(배열로 들어와서 펼침연산자로 풀어서), planvo에 담은 list<detailvo>의 필드명(여러건) 

				await fetch('ajax/insertProdPlan', {
					method: 'post',
					headers: jsonHeaders,
					body : JSON.stringify(param)
				})
				.then(res => res.json())
				.then(res => {
					//console.log(res);
					if(res.prodPlanCode != null) { //vo로 넘겨받음
						alert('생산계획이 등록되었습니다.');
						saveRes(res);
					} else {
						alert('등록 중 오류 발생');
					}
				})
			}

			//등록응답 (그리드에 입력된 모든 정보 비우기)
			function saveRes(res) {
				//plInsert.setValue(0, prodReqCode, '');
				//getProdReq();
				plDeInsert.resetData([]);
				plreq.resetData([]);
				plreqD.resetData([]);
			}


			//제품코드 입력 Modal
			let myModal = null;

			plDeInsert.on("click", (e) => {
				console.log(e);
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
			}
			//등록
			saveProduct.addEventListener('click', function() {
				let pro = plDeInsert.getFocusedCell().rowKey;
				if (pro != null) {
					closemodal();
					plDeInsert.setValue(pro, "productCode", document.querySelector('input[name="productCode"]:checked').value);
				}
			});
			




			  