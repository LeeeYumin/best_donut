adminProQual();

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
				header : '검사접수일자',
				name : 'CHECK_RECV_DATE',
				align : "center",
				formatter: function(date) {
			        let dateForm = new Date(date.value);
			        let year = dateForm.getFullYear();
			        let month = ('0' + (dateForm.getMonth() + 1)).slice(-2);
			        let day = ('0' + dateForm.getDate()).slice(-2);
			        let dateStr = `${year}-${month}-${day}`;
			        return dateStr;
			      }
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

	async function adminProQual(){
	await fetch(`ajax/adminPro`)
	.then(res => res.json())
	.then(res => {
		console.log(res);
		grid.resetData(res);
	})
};
    