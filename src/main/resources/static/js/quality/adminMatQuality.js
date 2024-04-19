getMatAdmin('','');

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
			},
			{
				header : '적합수량',
				name : 'checkDoneCnt',
				align : "center",
			}
		]

	});


	grid.on('beforeChange', ev => {
	      console.log('before change:', ev);
	    });
    grid.on('afterChange', ev => {
      console.log('after change:', ev);
    })


	async function getMatAdmin(){
		let matCode = $('#matCode').val();
		let searchStartDate = $('#searchStartDate').val();
		let searchEndDate = $('#searchEndDate').val();

		let param = {matCode, searchStartDate, searchEndDate};

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



	async function getMatAdminStart(){
		let matCode = $('#matCode').val();
		let searchStartDate = $('#searchStartDate').val();
		let searchEndDate = $('#searchEndDate').val();

		let param = {matCode, searchStartDate, searchEndDate};

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

	function findMat() {
		let matCode = document.querySelector('#matCode').value;
  	let inoutDate = document.querySelector('#inDate').value; //#id
		console.log(matCode, inoutDate);
  	getMatAdmin(matCode, inoutDate);
	}

	if($('#auth').html() != '1'){
		$('#selDelBtn','#updateBtn').attr('style', 'display : none;');
		}