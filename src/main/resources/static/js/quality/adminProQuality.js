
	const grid = new tui.Grid({
		el : document.getElementById('grid'),
		scrollX : false,
		scrollY : true,
		rowHeaders: ['checkbox'],
		columns : [
			{
				header : '제품코드',
				name : 'PRODUCT_CODE',
				align : "center",
			},
			{
				header : '제품명',
				name : 'PRODUCT_NAME',
				align : "center",
			},
			{
				header : '검사접수날짜',
				name : 'CHECK_RECV_DATE',
				align : "center",
			},
			{
				header : '검사결과',
				name : 'LAST_RESULT',
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
