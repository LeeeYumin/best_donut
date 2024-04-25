adminProQual('','');

// grid 생성
const grid = new tui.Grid({
	el : document.getElementById('grid'),
	bodyHeight: 500,
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	columns : [
		{
			header : '제품LOT코드',
			name : 'productLotCode',
			align : "center",
			sortable: true,
		},
		{
			header : '완제품 품질 검사 코드',
			name : 'productQltyCheckCode',
			align : "center",
			sortable: true,
		},
		{
			header : '제품명',
			name : 'productName',
			align : "center",
			sortable: true,
		},
		{
			header : '검사접수일자',
			name : 'checkRecvDate',
			align : "center",
			sortable: true,
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
			header : '적합수량',
			name : 'goodCnt',
			align : "center",
		},
		{
			header : '검사결과',
			name : 'lastResult',
			align : "center",
			sortable: true,
			formatter : 'listItemText',
			// editingEvent : 'click',
			editor: {
			type: 'select',
			options: {
				listItems: [
					{ text: '판매가능', value: 'PRY' },
					{ text: '판매불가(폐기)', value: 'PRN' }
				],
			}
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

	async function adminProQual(productName, checkDate){ //parameter랑 mapper.xml 이랑 맞아야됨
		await fetch("ajax/adminProQual?productName="+productName+"&checkRecvDate="+checkDate)
								//`ajax/adminProQual?prodName=${prodName}&checkDate=${checkDate}`
		.then(res => res.json())
		.then(res => {
			console.log(res);
			grid.resetData(res);
		})
	};

//제품명, 검사접수일자 검색
function findProd() {
  let prodName = document.querySelector('#prodName').value;
  let checkDate = document.querySelector('#inDate').value; //#id
	//console.log(prodName,checkDate);
  adminProQual(prodName, checkDate);
}

//시큐리티 관련 버튼 가림
if($('#auth').html() != '1'){
	$('#updateBtn').attr('style', 'display : none;');
	}

//초기화 버튼 클릭
function reset() {
	document.querySelector('#prodName').value = '';
	document.querySelector('#inDate').value = '';
	adminProQual('','');
}