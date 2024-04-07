getMatInfo('','');

class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 0;
		el.max = grid.getColumnValues('inoutCnt');
		el.step = 1;
    el.width = 5;
		el.maxLength = maxLength;
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

const grid = new tui.Grid({
  el : document.getElementById('grid'),
  scrollX : false,
  scrollY : true,
  rowHeaders: ['checkbox'],
  columns : [
    {
      header : '자재LOT코드',
      name : 'matLotCode',
      align : "center",
    },
    {
      header : '입고날짜',
      name : 'inputDate',
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
      header : '입고수량',
      name : 'inoutCnt',
      align : "center",
      formatter: function(price) {
				return priceFormat(price.value);
			},
    },
    {
      header : '입고차량검사',
      name : 'warehousingVehiclesCheck',
      align : "center",
      formatter : 'listItemText',
      editingEvent : 'click',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '적합', value: 'IV1' },
                  { text: '부적합', value: 'IV2' },
                  { text: '차량검사 해당없음', value: 'IV3' }
                ],
              }
            }
    },
    {
      header : '이물질',
      name : 'foreignExist',
      align : "center",
      formatter : 'listItemText',
      // defaultValue : 'PFN',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '무', value: 'PFN' },
                  { text: '유', value: 'PFY' }
                ]
              }
            }
    },
    {
      header : '포장상태',
      name : 'packStatus',
      align : "center",
      formatter : 'listItemText',
      // defaultValue : 'PSY',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '양호', value: 'PSY' },
                  { text: '불량', value: 'PSN' }
                ]
              }
            }
    },
    {
      header : '부적합기준(total)',
      name : 'lastResult',
      align : "center",
      formatter : 'listItemText',
      // defaultValue : 'MCY',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '적합', value: 'MCY' },
                  { text: '부적합', value: 'MCN' }
                ]
              }
            }
    },
    {
      header : '부적합일지',
      name : 'badSep',
      align : "center",
      // nativeEvent : 'Event',
      hidden : true
    },
    {
      header : '적합수량',
      name : 'goodCnt',
      align : "center",
      editor: {
				type: CustomNumberEditor,
				options: {
          maxLength : 5
				}
			},
      formatter: function(price) {
				return priceFormat(price.value);
			},
    },
    {
      header : '자재코드',
      name : 'matCode',
      align : "center",
      // nativeEvent : 'Event',
      //hidden : true
    }
  ]
});

async function getMatInfo(matLotCode, inoutDate){
  await fetch("ajax/matInfo?matLotCode="+matLotCode+"&inoutDate="+inoutDate)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid.resetData(res);
  })
};

function findMat() {
  let matLotCode = document.querySelector('#matLOT').value;
  let inoutDate = document.querySelector('#inDate').value; //#id
  getMatInfo(matLotCode, inoutDate);
}

//부적합기준(total) 변경 + 적합수량보다 많이 입력할 경우 알림
grid.on('afterChange', event => {
  console.log(event.changes[0]); //0번째 배열에 정보가 들어있음
  let ev = event.changes[0];
  if (ev.value == 'IV2' || ev.value == 'PFY' || ev.value == 'PSN'){
    grid.setValue(ev.rowKey,'lastResult','MCN');
  }

  let vehicle = grid.getRow(ev.rowKey).warehousingVehiclesCheck;
  let foreign = grid.getRow(ev.rowKey).foreignExist;
  let pack = grid.getRow(ev.rowKey).packStatus;

  if (vehicle == 'IV1' && foreign == 'PFN' && pack == 'PSY'){
    grid.setValue(ev.rowKey,'lastResult','MCY');
  }

  console.log(event.changes[0].columnName);
  if(event.changes[0].columnName == 'goodCnt'){
    if(event.changes[0].value > grid.getValue(ev.rowKey,'inoutCnt')){
      alert("입고수량을 초과하였습니다");
      grid.setValue(ev.rowKey,'goodCnt',null);
    }
  }
})

//체크하고 등록하면 목록에서 사라지고 재고에 수량 업데이트
async function insertMat() {
  const checkedRows = grid.getCheckedRows()

    await fetch("ajax/insertMatQ",{
      method : 'post',
      headers : jsonHeaders,
      body : JSON.stringify(checkedRows),
    })
    .then (res => res.json())
    .then (res => {
      console.log(res);
    })
}

