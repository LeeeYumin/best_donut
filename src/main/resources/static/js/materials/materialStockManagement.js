getMaterialsList();

const grid1 = new tui.Grid({
	el: document.getElementById('materialsList'),
	scrollX: false,
	scrollY: false,
	columns: [
		{
			header: '자재코드',
			name: 'matCode',
			align: 'center',
			sortable: true,
			validation: {
				validatorFn: (value, row, columnName) => Number(row['stockCnt']) > Number(row['safeStockCnt'])
			}
		},
		{
			header: '자재명',
			name: 'matName',
			align: 'center',
			validation: {
				validatorFn: (value, row, columnName) => Number(row['stockCnt']) > Number(row['safeStockCnt'])
			}
		},
		{
			header: '재고량',
			name: 'stockCnt',
			align: 'end',
			sortable: true,
			formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
			validation: {
				validatorFn: (value, row, columnName) => Number(row['stockCnt']) > Number(row['safeStockCnt'])
			}
		},
		{
			header: '단위',
			name: 'unit',
			width: 50,
			validation: {
				validatorFn: (value, row, columnName) => Number(row['stockCnt']) > Number(row['safeStockCnt'])
			}
		},
		{
			header: '안전재고량',
			name: 'safeStockCnt',
			align: 'center',
			validation: {
				validatorFn: (value, row, columnName) => Number(row['stockCnt']) > Number(row['safeStockCnt'])
			}
		}
	]
});

// 재고 조회(ajax)
function getMaterialsList() {
	const matName = document.getElementById('matName').value;
	fetch("/ajax/materials?matName=" + matName)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			grid1.resetData(res);
			console.log(res);
		})
};

// 검색 관련 함수
document.getElementById('searchBtn').addEventListener('click', getMaterialsList);
document.getElementById('matName').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getMaterialsList();
	}
})

// 초기화 버튼
document.getElementById('resetBtn').addEventListener('click', () => {
	document.getElementById('matName').value = '';
	getMaterialsList();
	getMaterialDetailsList();
});

// 자재 상태
class MatStatusConverter {
	constructor(props) {
		const el = document.createElement('div');

		this.el = el;
		this.render(props);
	}
	render(props) {
		if (props.formattedValue == 'MSC') {
			this.el.innerText = '소진';
		} else if (props.formattedValue == 'MSN') {
			this.el.innerText = '폐기';
		} else {
			this.el.innerText = '정상';
		}
	}
	getElement() {
		return this.el;
	}
}

const grid2 = new tui.Grid({
	el: document.getElementById('materialDetails'),
	scrollX: false,
	scrollY: false,
	rowHeaders: ['checkbox'],
	columns: [
		{
			header: 'LOT',
			name: 'matLotCode',
			align: 'center',
			sortable: true
		},
		{
			header: '자재코드',
			name: 'matCode',
			align: 'center'
		},
		{
			header: '자재명',
			name: 'matName',
			align: 'center',
			sortable: true,
		},
		{
			header: '입고수량',
			name: 'warehousingCnt',
			align: 'end',
			formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
		},
		{
			header: '단위',
			name: 'matUnit',
			width: 50,
		},
		{
			header: '불출수량',
			name: 'outCnt',
			align: 'center',
			defaultValue: 0,
			formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
		},
		{
			header: '현재고량',
			name: 'remainCnt',
			align: 'end',
			formatter: function (cnt) {
                return priceFormat(cnt.value);
            },
			defaultValue: 0
		},
		{
			header: '단위',
			name: 'matUnit',
			width: 50,
		},
		{
			header: '유통기한',
			name: 'expDate',
			align: 'center'
		},
		{
			header: '자재상태',
			name: 'matStatus',
			align: 'center',
			renderer: { type: MatStatusConverter }
		}
	],
});

// 상세 로트 조회(ajax)
function getMaterialDetailsList(matCode) {
	fetch("/ajax/materiallots?matCode=" + matCode)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			grid2.resetData(res);
			console.log(res);
		})
};

grid1.on('click', (ev) => {
	let matCode = grid1.getValue(ev.rowKey, 'matCode')
	console.log(matCode);
	getMaterialDetailsList(matCode);
})

// 자재 상태 체크
function checkMatStatus() {
	for (i = 0; i < grid2.getCheckedRows().length; i++) {
		if (grid2.getCheckedRows()[i].matStatus == 'MSN') {
			Swal.fire({
				title: "이미 폐기된 자재가 선택되었습니다.",
				icon: "warning"
			});
			grid2.uncheck(i)
		}
	}
}
grid2.on('check', (ev) => {
	checkMatStatus()
});
grid2.on('checkAll', (ev) => {
	checkMatStatus()
});

// 폐기 버튼 기능
document.getElementById('disposeBtn').addEventListener('click', () => {
	if (grid2.getCheckedRowKeys() == '') {
		Swal.fire({
			title: "선택된 자재가 없습니다.",
			icon: "warning"
		});
	} else {
		Swal.fire({
			title: "정말로 폐기하시겠습니까?",
			text: "폐기한 자재는 더이상 사용하실 수 없습니다.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "네, 폐기하겠습니다.",
			cancelButtonText: "취소",
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				let matLotCodes = '';
				for (i = 0; i < grid2.getCheckedRows().length; i++) {
					if (i > 0) {
						matLotCodes += "&";
					}
					matLotCodes += "matLotCodes=" + grid2.getCheckedRows()[i].matLotCode;
				}
				console.log(matLotCodes);
				disposeMat(matLotCodes);

				Swal.fire({
					title: "폐기 완료",
					text: "선택한 자재가 폐기되었습니다.",
					icon: "success"
				});
			}
		});
	}
})

// 자재 상태 업데이트 후 그리드 다시 그려주기
function disposeMat(matLotCodes) {
	let matCode = grid1.getValue(grid1.getFocusedCell().rowKey, 'matCode');
	fetch("/ajax/disposeMat?" + matLotCodes)
		.then(res => res.json())
		.then(res => {
			// ajax로 불러온 데이터 그리드에 넣음
			getMaterialsList();
			getMaterialDetailsList(matCode);
			console.log(res);
		})
};

// 폐기 버튼 권한 체크
if ($('#auth').html() != '1') {
	$('#disposeBtn').attr('style', 'display:none;');
}