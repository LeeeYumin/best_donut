getProductList();
getCompany();

const uName = $('#uName').html();
const uCode = $('#uCode').html();
$('#usersName').val(uName);

// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

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
		el.style.width = '100%';
		el.value = props.value;
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
};


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
	const usersCode = uCode;

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
	let param = {ordersDate, dueDate, totalOrdersPrice, companyCode, usersCode, ordDetList:ordDetlist}
	console.log(param);

	
	// (3) 등록 fetch

  let result = await fetch('ajax/insertOrders',{
		method : 'post',
   	headers: jsonHeaders,
		body : JSON.stringify(param)
	});
	let res = await result.json();
	console.log(res);
	
	// (4) 등록 후속처리
	if(res){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "주문등록 완료!",
			text: "주문등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
		resetInsert();
	}
	else {
		Swal.fire({
			position: "center",
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
	const diffDate = Math.abs((dDate.getTime() - oDate.getTime()) / (1000 * 60 * 60 * 24));

	console.log('diffDate : ', diffDate);

	// 주문일자 검사
	if(insertForm.ordersDate.value == '' || insertForm.ordersDate.value == null) {
		valid.innerHTML = '<i class="bx bx-error-circle"></i> 주문일자를 입력해주세요.';
		return false;
	}

	// 납기일자 검사
	if(insertForm.dueDate.value == '' || insertForm.dueDate.value == null) {
		valid.innerHTML = '<i class="bx bx-error-circle"></i> 납기일자를 입력해주세요.';
		return false;
	}

	// 리드타임 검사(2주)
	if(diffDate < 14) {
		valid.innerHTML = '<i class="bx bx-error-circle"></i> 납기일자는 주문일자로부터 최소 2주 후 입니다.';
		return false;
	}

	// 2. 거래처코드 검사
	if(insertForm.companyName.value == '' || insertForm.companyName.value == null) {
		valid.innerHTML = '<i class="bx bx-error-circle"></i> 거래처를 입력해주세요.';
		return false;
	}

	// 3. 담당자 검사
	if(insertForm.usersName.value == '' || insertForm.usersName.value == null) {
		valid.innerHTML = '<i class="bx bx-error-circle"></i> 담당자를 입력해주세요.';
		return false;
	}

	// 4. 주문금액 검사
	if(insertForm.totalOrdersPrice.value == 0) {
		valid.innerHTML = '<i class="bx bx-error-circle"></i> 주문상세 정보를 입력해주세요.';
		return false;
	}

	valid.innerHTML = '';
	return true;
}

// 초기화
function resetInsert(){
	insertForm.reset();
	getProductList();
	$('#usersName').val(uName);
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


// 거래처 목록 가져오기
// 그리드 생성
const companyGrid = new tui.Grid({
	el : document.getElementById('companyGrid'),
	scrollX : false,
	scrollY : true,
	header:[
		align = 'center',
	],
	columns : [ 
    {
      header : '거래처코드',
      name : 'companyCode',
      align : 'center',
			
    }, 
		{
      header : '거래처명',
      name : 'companyName',
      align : 'center',
    }, 
	]
})

// 데이터 생성
function getCompany() {
 fetch('ajax/getCompany')
 .then(res => res.json())
 .then(res => {
	 console.log(res);

	// 모달창 다 띄워지고 나서 그리드 데이터 가져오기
	$(document).ready(function(){
    $('#modalCenter').on('shown.bs.modal', function(e) {
			companyGrid.resetData(res);
			// 그리드 refresh
			companyGrid.refreshLayout()
			})
    })
	})
}

// 거래처 그리드 클릭시 거래처코드, 거래처명 가져옴
companyGrid.on('click', (event) => {
	// input에 거래처명 입력
	insertForm.companyCode.value = companyGrid.getValue(event.rowKey, 'companyCode');
	insertForm.companyName.value = companyGrid.getValue(event.rowKey, 'companyName');
	// 닫기버튼 클릭
	document.getElementById('closeBtn').click();
})

