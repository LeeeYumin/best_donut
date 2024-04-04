// 주문등록

// 1. FormData 방식
async function saveInsert() {
	let formData = new FormData(document.frm);

  for (let data of formData) {
      console.log(data[0]+ ', ' + data[1]); 
  }

	await fetch('ajax/insertOrders',{
		method : 'post',
    headers: formDataHeaders,
		body : formData
	})
	.then(res => res.json())
	.then(res => {
    console.log(res);
  })
  
}

// 2.JsonString 방식
async function saveInsert1() {

  const ordersCode = frm.ordersCode.value;
	const ordersDate = frm.ordersDate.value;
	const dueDate = frm.dueDate.value;
	const totalOrdersPrice = frm.totalOrdersPrice.value;
	const companyCode = frm.companyCode.value;

	let param = {ordersCode, ordersDate, dueDate, totalOrdersPrice, companyCode}
  console.log(param);
	
  await fetch('ajax/insertOrders',{
		method : 'post',
    headers: jsonHeaders,
		body : JSON.stringify(param)
	})
	.then(res => res.json())
	.then(res => {
    console.log(res);
  })
}

// grid 
const grid = new tui.Grid({
	el : document.getElementById('grid'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '완제품코드',
      name : 'PRODUCT_CODE',
      align : 'center',
    }, 
		{
			header : '주문수량',
			name : 'ORDERS_CNT',
			align : 'center',
		}, 
		{
			header : '공급가액',
			name : 'SUPPLY_PRICE',
			align : 'center',

			formatter: function(date) {
				return dateFormat(date);
			},
		}, 
		{
			header : '부가세',
			name : 'TAX',
			align : 'center',
			formatter: function(date) {
				return dateFormat(date);
			}
		}, 
		{
			header : '총공급대가',
			name : "TOTAL_SUPPLY_PRICE",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
	]
})
