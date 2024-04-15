adminProQual('','');

	const grid = new tui.Grid({
		el : document.getElementById('grid'),
		scrollX : false,
		scrollY : true,
		rowHeaders: ['checkbox'],
		columns : [
			{
				header : '제품코드',
				name : 'productCode',
				align : "center",
			},
			{
				header : '제품명',
				name : 'productName',
				align : "center",
			},
			{
				header : '검사접수일자',
				name : 'checkRecvDate',
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
				name : 'lastResult',
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

	async function adminProQual(prodCode, checkDate){
		await fetch("ajax/adminPro?prodCode="+prodCode+"&checkDate="+checkDate)
								//`ajax/adminPro?prodCode=${prodCode}&checkDate=${checkDate}`
		.then(res => res.json())
		.then(res => {
			console.log(res);
			grid.resetData(res);
		})
	};

//제품명, 검사접수일자 검색
function findProd() {
  let prodCode = document.querySelector('#prodCode').value;
  let checkDate = document.querySelector('#inDate').value; //#id
  adminProQual(prodCode, checkDate);
}
