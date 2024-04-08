// 1. 화면 세팅

// grid custom editor
class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 0;
		el.max = 1000;
		el.step = 100;
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

// 제품목록 출력
(function getProductList() {
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
})();


// 2. 주문등록

// < FormData 방식 >
// async function FormDataInsert() {

// 	// 입력값 검사
// 	if(!inputValidation()){
// 		return;
// 	}
	
// 	let formData = new FormData(document.insertForm);

// 	for (let data of formData) {
// 		console.log(data[0]+ ', ' + data[1]); 
// 	}

// 	await fetch('ajax/insertOrders',{
// 		method : 'post',
//     	headers: formDataHeaders,
// 		body : formData
// 	})
// 	.then(res => res.json())
// 	.then(res => {
//     console.log(res);
//   })
// }

// < JsonString 방식 >
async function saveInsert() {

	// (1) parameter 준비
	// 주문정보 : input 데이터 변수에 저장
	const ordersDate = insertForm.ordersDate.value;
	const dueDate = insertForm.dueDate.value;
	const totalOrdersPrice = insertForm.totalOrdersPrice.value;
	const companyCode = insertForm.companyCode.value;

	// 주문상세정보 : 주문량 0 아닌 제품 주문만 list에 저장
	let ordDetlist = [];
	let ordersCnt = grid.getColumnValues('ordersCnt');
	for(let i = 0; i < grid.getRowCount(); i++){
		if(ordersCnt[i] != 0) {
			ordDetlist.push(grid.getRow(i));
		}
	}

	// (2) 입력값 유효성 검사
	if(!inputValidation()){
		return;
	}

	// parameter
	let param = {ordersDate, dueDate, totalOrdersPrice, companyCode, ordDetList:ordDetlist}
	console.log(param);

	
	// (3) 등록 fetch
	let result = '';

  await fetch('ajax/insertOrders',{
		method : 'post',
   		 headers: jsonHeaders,
		body : JSON.stringify(param)
	})
	.then(res => res.json())
	.then(res => {
    result = res;
  })


	// (4) 등록 후속처리
	if(result){
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "주문등록 완료!",
			text: "주문등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}
	else {
		Swal.fire({
			position: "top-end",
			icon: "error",
			title: "주문등록 실패",
			text: "주문등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}
}

// 입력값 유효성 검사
function inputValidation() {
	const valid = document.querySelector('#defaultFormControlHelp');

	// 1. 날짜 검사
	const oDate = new Date(insertForm.ordersDate.value);	// 주문일자
	const dDate = new Date(insertForm.dueDate.value);			// 납기일자
	const dateDiff = dDate.getDate()-oDate.getDate()			// 리드타임(2주)

	// 주문일자 검사
	if(insertForm.ordersDate.value == '' || insertForm.ordersDate.value == null) {
		valid.innerHTML = '주문일자를 입력해주세요.';
		return false;
	}

	// 납기일자 검사
	if(insertForm.dueDate.value == '' || insertForm.dueDate.value == null) {
		valid.innerHTML = '납기일자를 입력해주세요.';
		return false;
	}

	// 리드타임 검사(2주)
	if(dateDiff < 14) {
		valid.innerHTML = '납기일자는 주문일자로부터\n최소 2주 후 입니다.';
		return false;
	}

	// 2. 거래처코드 검사
	if(insertForm.companyCode.value == '' || insertForm.companyCode.value == null) {
		valid.innerHTML = '거래처 코드를 입력해주세요.';
		return false;
	}

	// 3. 주문금액 검사
	if(insertForm.totalOrdersPrice.value == 0) {
		valid.innerHTML = '주문상세 정보를 입력해주세요.';
		return false;
	}

	valid.innerHTML = '';
	return true;
}

function resetInsert(){
	insertForm.ordersDate.value = '';
	insertForm.dueDate.value = '';
	insertForm.companyCode.value = '';
}

// grid 생성
const grid = new tui.Grid({
	el : document.getElementById('ordDetGrid'),
	scrollX : false,
	scrollY : true,
	// rowHeaders: ['checkbox'],
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
	summary: {
		align : 'center',
		height: 40,
		position: 'bottom', // or 'top'
		columnContent: {
			productCode: {
				template: function() {
					return '합계';
				}, 
			},
			ordersCnt: {
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
			supplyPrice: {
				template: function(value) {
					return priceFormat(value.sum);
				}, 
			},
			tax: {
				template: function(value) {
					return priceFormat(value.sum);
				}
			},
			totalSupplyPrice: {
				template: function(value) {
					document.querySelector('#totalOrdersPrice').value = value.sum;
					return priceFormat(value.sum);
				}
			}
		},
	}
})

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

function resetOrdDet(){
	grid.setColumnValues('ordersCnt',0);
	grid.setColumnValues('supplyPrice',0);
	grid.setColumnValues('tax',0);
	grid.setColumnValues('totalSupplyPrice',0)
}
