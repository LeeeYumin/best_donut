getOrdersList({});

// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// ordGrid.  주문 조회

// 1. grid 생성
const ordGrid = new tui.Grid({
	el : document.getElementById('ordGrid'),
	scrollX : false,
	scrollY : true,
	bodyHeight : 300,
	header:[
		align = 'center',
	],
	columns : [ 
		{
			header : '주문코드',
			name : 'ordersCode',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
		}, 
		{
			header : '주문일자',
			name : 'ordersDate',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
			formatter: function(date) {
				return dateFormat(date.value);
			},
		}, 
		{
			header : '납기일자',
			name : 'dueDate',
			align : 'center',
			sortingType: 'desc',
			sortable: true,			
			formatter: function(date) {
				return dateFormat(date.value);
			}
		}, 
		{
		header : '주문제품',
		name : 'cntStr',
		align : 'center',
		}, 
		{
			header : '총주문금액',
			name : "totalOrdersPrice",
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		}, 
		{
			header : '주문상태',
			name : 'ordersStatus',
			align : 'center',
			sortingType: 'desc',
			sortable: true,	
			formatter : 'listItemText',
			editor: {
				type: 'text',
				options: {
				listItems: [
					{ text: '미확인', value: 'OP1' },
					{ text: '확인', value: 'OP2' },
					{ text: '생산요청', value: 'OP3' },
					{ text: '납품완료', value: 'OP4' },
				],
				}
			}
		}, 
		{
			header : '담당자명',
			name : 'usersName',
			align : 'center',
		}, 
		{
			header : '거래처명',
			name : 'companyName',
			align : 'center',
		},
	],
})


// 2. gridData 생성

// 주문 조회(ajax)
function getOrdersList(param){
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	fetch('ajax/getOrders', data)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		ordGrid.resetData(res);
	})
}


// 3. 이벤트

// 거래처 목록 가져오기
function getCompany() {
  fetch('ajax/getCompany')
  .then(res => res.json())
  .then(res => {

		for(company of res){
			let optionHtml = '<option value="' + company.companyCode + '">' + company.companyName + '</option>'
			let companyName = document.querySelector("#companyName")
			companyName.insertAdjacentHTML('beforeend', optionHtml);
		}
	})
}
getCompany();

// 주문 검색버튼 클릭 이벤트
async function searchOrders(){
	let ordersCode = searchForm.ordersCode.value;
	let companyCode = searchForm.companyName.value;
	let ordersStartDate = searchForm.ordersStartDate.value;
	let ordersEndDate = searchForm.ordersEndDate.value;
	let dueStartDate = searchForm.dueStartDate.value;
	let dueEndDate = searchForm.dueEndDate.value;

	let param = {ordersCode, companyCode, ordersStartDate, ordersEndDate, dueStartDate, dueEndDate};
	getOrdersList(param);
}

// 검색 초기화
function searchReset() {
	searchForm.reset();
	getOrdersList({});
}

// 주문상세 목록 띄우기, 주문코드 가져오기
ordGrid.on('click', (event) => {
	let ordersCode = ordGrid.getValue(event.rowKey, 'ordersCode');
	document.querySelector('#ordersCodeInput').value = ordersCode;
	getOrdersDetail(ordersCode);
})


// detGrid.  주문 상세 조회

// 1. grid 생성
const detGrid = new tui.Grid({
	el : document.getElementById('detGrid'),
	bodyHeight : 230,
	scrollX : false,
	scrollY : true,
	columns : [ 
		{
			header : '주문코드',
			name : 'ordersCode',
			align : 'center',
			hidden : true,
		}, 
		{
			header : '주문상세코드',
			name : 'ordersDetailCode',
			align : 'center',
		}, 
		{
			header : '완제품명',
			name : 'productName',
			align : 'center',
		}, 
		{
			header : '주문수량',
			name : 'ordersCnt',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
		{
			header : '재고수량',
			name : 'stockCnt',
			align : 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
			validation : {
        validatorFn : (value, row, columnName) => Number(row['stockCnt']) > Number(row['ordersCnt'])
      }
		},
	],
})

// 2. gridData 생성

// 주문 상세 조회(ajax)
function getOrdersDetail(ordersCode){
	fetch(`ajax/ordersDetail?ordersCode=${ordersCode}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
		detGrid.resetData(res);
	})
};

// 3. 이벤트

async function insertProdOut() {

	// data 준비
	let ordersCode = document.querySelector('#ordersCodeInput').value;
	let result = '0';
	let data = {ordersCode, result};
	console.log(data);

	// ordersCode 검사
	if(ordersCode == '' || ordersCode == null){
		Swal.fire({
			position: "center",
			icon: "error",
			title: "출고 등록 실패",
			text: "주문코드를 입력해주십시오.",
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}

	// 재고 검사
	if(detGrid.validate().length != 0){
		Swal.fire({
			position: "center",
			icon: "error",
			title: "출고 등록 실패",
			text: "재고수량이 충분하지 않습니다.",
			showConfirmButton: false,
			timer: 1500
		});
		return;
	}

	// promise
	let res = await fetch("ajax/prodInoutProcess",{
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(data)
	})
	let check = await res.json()
	console.log(check);

	// 알람창 띄우기
	if(check == -1) {
		Swal.fire({
			position: "center",
			icon: "success",
			title: "출고 등록 완료!",
			text: "출고 등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "출고 등록 실패",
			text: "출고 등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}
}


// 등록입력창 세팅
document.querySelector('#inoutDate').value = dateFormat(new Date());
document.querySelector('#userName').value = '김현준';

if($('#auth').html() != '1'){
$('#insertBtn').attr('style', 'display : none;');
}