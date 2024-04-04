getMatInfo('','');

	const grid = new tui.Grid({
		el : document.getElementById('grid'),
		scrollX : false,
		scrollY : true,
		rowHeaders: ['checkbox'],
		columns : [
			{
				header : '자재LOT코드',
				name : 'MAT_LOT_CODE',
				align : "center",
			},
			{
				header : '자재코드',
				name : 'MAT_CODE',
				align : "center",
			},
			{
				header : '자재명',
				name : 'MAT_NAME',
				align : "center",

			},
			{
				header : '검사 종결여부',
				name : 'QLTY_CHECK_STATUS',
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
				name : 'WAREHOUSING_CNT',
				align : "center",
			},
			{
				header : '적합수량',
				name : 'CHECK_DONE_CNT',
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


	async function getMatInfo(matCode, inoutDate){
		await fetch(`ajax/adminMat?matCode=${matCode}&inoutDate=${inoutDate}`)
		.then(res => res.json())
		.then(res => {
			console.log(res);
			grid.resetData(res);
		})
	};

	function findMat() {
		let matCode = document.querySelector('#matCode').value;
  	let inoutDate = document.querySelector('#inDate').value; //#id
  	getMatInfo(matCode, inoutDate);
	}