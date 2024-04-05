getMatInfo('','');

class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 0;
		el.max = grid.getColumnValues('INOUT_CNT');
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
      name : 'MAT_LOT_CODE',
      align : "center",
    },
    {
      header : '입고날짜',
      name : 'INOUT_DATE',
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
      name : 'INOUT_CNT',
      align : "center",
      formatter: function(price) {
				return priceFormat(price.value);
			},
    },
    {
      header : '입고차량검사',
      name : 'WAREHOUSING_VEHICLES_CHECK',
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
      name : 'FOREIGN_EXIST',
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
      name : 'PACK_STATUS',
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
      name : 'LAST_RESULT',
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
      name : 'BAD_SEP',
      align : "center",
      // nativeEvent : 'Event',
      hidden : true
    },
    {
      header : '적합수량',
      name : 'GOOD_CNT',
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
    }

  ]

});

async function getMatInfo(matLotCode, inoutDate){
  await fetch("ajax/matInfo?matLotCode="+matLotCode+"&inoutDate="+inoutDate)
  //`ajax/matInfo?matLotCode=${matLotCode}&inoutDate=${inoutDate}`
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
  console.log(event.changes[0]);
  let ev = event.changes[0];
  if (ev.value == 'IV2' || ev.value == 'PFY' || ev.value == 'PSN'){
    grid.setValue(ev.rowKey,'LAST_RESULT','MCN');
  }

  let vehicle = grid.getRow(ev.rowKey).WAREHOUSING_VEHICLES_CHECK;
  let foreign = grid.getRow(ev.rowKey).FOREIGN_EXIST;
  let pack = grid.getRow(ev.rowKey).PACK_STATUS;

  if (vehicle == 'IV1' && foreign == 'PFN' && pack == 'PSY'){
    grid.setValue(ev.rowKey,'LAST_RESULT','MCY');
  }

  console.log(event.changes[0].columnName);
  if(event.changes[0].columnName == 'GOOD_CNT'){
    if(event.changes[0].value > grid.getValue(ev.rowKey,'INOUT_CNT')){
      alert("입고수량을 초과하였습니다");
      grid.setValue(ev.rowKey,'GOOD_CNT',null);
    }
  }
})

//체크하고 저장
// grid.on(

// )
// let rows = gridView.getCheckedRows(true);
