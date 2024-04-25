// getMatAdmin();
getMatAdminStart();

// grid 생성
const grid = new tui.Grid({
	el : document.getElementById('grid'),
	bodyHeight: 500,
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	columns : [
		{
			header : '자재LOT코드',
			name : 'matLotCode',
			align : "center",
			sortable: true,
		},
		{
			header : '자재코드',
			name : 'matCode',
			align : "center",
			sortable: true,
		},
		{
			header : '자재명',
			name : 'matName',
			align : "center",
		},
		{
			header : '입고일자',
			name : 'inoutDate',
			align : "center",
		},
		{
			header : '적합여부',
			name : 'lastResult',
			align : "center",
			formatter : 'listItemText',
			editor: {
				type: 'select',
				options: {
				listItems: [
						{ text: '적합', value: 'MCY' },
				{ text: '부적합', value: 'MCN' }
					]
					}
				}
		},
		{
			header : '검사 종결여부',
			name : 'qltyCheckStatus',
			align : "center",
			formatter : 'listItemText',
			editor: {
				type: 'select',
				options: {
					listItems: [
						{ text: '미검사', value: 'MI1' },
						{ text: '검사완료', value: 'MI2' }
					]
				}
			}
		},
		{
			header : '입고수량',
			name : 'warehousingCnt',
			align : "center",
			formatter : function(data){
				return priceFormat(data.value);
			}
		},
		{
			header : '적합수량',
			name : 'checkDoneCnt',
			align : "center",
			formatter : function(data){
				return priceFormat(data.value);
			}
		}
	]

});


	grid.on('beforeChange', ev => {
	      console.log('before change:', ev);
	    });
    grid.on('afterChange', ev => {
      console.log('after change:', ev);
    })

	//자재코드, 날짜 범위로 검색
	async function getMatAdmin(){
		let matCode = $('#matCode').val();
		let searchStartDate = $('#searchStartDate').val();
		let searchEndDate = $('#searchEndDate').val();

		let param = {matCode, searchStartDate, searchEndDate};
		console.log(param)

		const data = {
			method: 'POST',
			headers: jsonHeaders,
			body : JSON.stringify(param)
		};

		let result = await fetch(`ajax/adminMat`, data);
		let res = await result.json();

			console.log(res);
			grid.resetData(res);

	};

	//날짜 검색
	async function getMatAdminStart(){
		let today = new Date();
		let searchStartDate = dateFormat(new Date(today.setDate(today.getDate()-1)));
		let searchEndDate = dateFormat(new Date());
		let param = {searchStartDate, searchEndDate};

		const data = {
			method: 'POST',
			headers: jsonHeaders,
			body : JSON.stringify(param)
		};

		await fetch(`ajax/adminMat`, data)
		.then(res => res.json())
		.then(res => {
			console.log(res);
			grid.resetData(res);
		})
	};

	//검색하고 나서 칸 리셋
	function reset(){
		$('#searchStartDate').val('');
		$('#searchEndDate').val('');
		$('#matCode').val('');
		getMatAdminStart();
	}

	//시큐리티 버튼 가림
	if($('#auth').html() != '1'){
		$('#selDelBtn','#updateBtn').attr('style', 'display : none;');
		}


