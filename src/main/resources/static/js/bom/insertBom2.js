getBomMatList();

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


// grid 생성
const bomGrid = new tui.Grid({
	el : document.getElementById('bomGrid'),
	scrollX : false,
	scrollY : true,
	rowHeaders: ['checkbox'],
	header:[
		align = 'center',
	],
	columns : [
    {
      header : '자재코드',
      name : 'matCode',
      align : 'center',
    },
    {
      header : '자재명',
			name : 'matName',
			align : 'center',
		},
		{
			header : '소요수량',
			name : 'needCnt',
			align : 'center',
			editor : {
				type : 'text',
			}
		},
    {
			header : '단위',
			name : 'unit',
			align : 'center',
		},
    {
			header : '단가',
			name : 'unitPrice',
			align : 'center',
		},
		{
			header : '공정',
			name : 'procCode',
			align : 'center',
		},
	],
})

function getBomMatList(){

	fetch('ajax/insertBom2')
	.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			bomGrid.resetData(res);
			console.log(res);
		})

	}

//등록버튼 기능
function saveInsert(){
	let productCode = document.querySelector('#productCode').value;
	let usersCode = document.querySelector('#usersCode').value;
	let pick = bomGrid.getCheckedRows();

	let param = {productCode, usersCode, pick}
	fetch("ajax/insertNewBom",{
		method : 'post',
		headers : jsonHeaders,
		body : JSON.stringify(param),
	})
	.then (res => res.json())
	.then (res => {
		console.log(res);

		//등록버튼 클릭 시 alert창 알림
		if(res > 0){
			Swal.fire({
				position: "center",
				icon: "success",
				title: "BOM 작성 완료!",
				text: "BOM이 정상적으로 등록되었습니다.",
				showConfirmButton: false,
				timer: 2000,
			});
			resetForm();
		}
		else {
			Swal.fire({
				position: "center",
				icon: "error",
				title: "BOM 작성 실패",
				text: "등록에 실패했습니다. 항목을 확인해주세요.",
				showConfirmButton: false,
				timer: 2000
			});
		}

		// if(res > 0){
		// 	alert("BOM이 정상적으로 등록되었습니다.")
		// }else{
		// 	alert("등록에 실패했습니다.")
		// }
	})
}

//bom 등록 후속처리

//시큐리티 확인(등록버튼 사라짐)
// if($('#auth').html() != '1'){
// 	$('#searchBtn').attr('style', 'display : none;');
// 	}

function resetForm() {
	insertForm.reset();
}