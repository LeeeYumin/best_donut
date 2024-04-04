class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 100;
		el.max = 1000;
		el.step = 100;
		el.maxLength = maxLength;
		el.value = String(props.value);
		this.el = el;
	}

	getElement() {
		return this.el;
	}

	getValue() {
		return this.el.value;
	}

	mounted() {
		this.el.select();
	}
}

function getProductList() {
	fetch("ajax/productList")
	.then(res => res.json())
	.then(res => {
		let ordDetAry = [];
		for (let i = 0; i < res.length; i++) {
			ordDetAry.push(
				{
					productCode: res[i].productCode,
					productName: res[i].productName,
					unitPrice: res[i].unitPrice,
					ordersCnt: '0',
					supplyPrice: '0',
					tax: '0',
					totalSupplyPrice: '0',
				}
				);
			}
		grid.resetData(ordDetAry);
	})
}


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
	el : document.getElementById('ordDetGrid'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '완제품코드',
      name : 'productCode',
      align : 'center',
			
    }, 
		{
      header : '완제품명',
      name : 'productName',
      align : 'center',
    }, 
		{
			header : '주문수량(개)',
			name : 'ordersCnt',
			align : 'center',
			editor: {
				type: CustomNumberEditor,
				options: {
					maxLength: 10
				}
			},
			formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
		{
			header : '단가(원)',
			name : 'unitPrice',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
		{
			header : '공급가액(원)',
			name : 'supplyPrice',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
		}, 
		{
			header : '부가세(원)',
			name : 'tax',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '총공급대가(원)',
			name : "totalSupplyPrice",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
	],
})
getProductList();

// 수량 변경시 금액 자동 계산
grid.on('afterChange', event => {
	let eventRow = grid.getRow(event.changes[0].rowKey);
	let ordersCnt = eventRow.ordersCnt;
	let unitPrice = eventRow.unitPrice;

	let supplyPrice = ordersCnt*unitPrice;
	let tax = supplyPrice*0.1;
	let totalSupplyPrice = supplyPrice + tax;

	grid.setValue(eventRow.rowKey, 'supplyPrice', supplyPrice, false);
	grid.setValue(eventRow.rowKey, 'tax', tax, false);
	grid.setValue(eventRow.rowKey, 'totalSupplyPrice', totalSupplyPrice, false);
	
})

