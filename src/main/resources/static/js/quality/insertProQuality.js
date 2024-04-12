
class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 0;
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

const grid1 = new tui.Grid({
  el : document.getElementById('grid1'),
  scrollX : false,
  scrollY : true,
  rowHeaders: ['checkbox'],
  columns : [
    {
      header : '완제품코드',
      name : 'productCode',
      align : "center",
    },
    {
      header : '완제품명',
      name : 'productName',
      align : "center",
    },
    {
      header : '완제품Lot코드',
      name : 'productLotCode',
      align : "center",
    },
    {
      header : '생산완료일자',
      name : 'allEndTime',
      align : "center",
    },
    {
      header : '입고수량',
      name : 'warehousingCnt',
      align : "center",
    },
    {
      header : '완제품 품질 등록',
      name : '',
      align : "center",
      // formatter : 'listItemText',
      // editingEvent : 'click',
      // editor: {
      //         type: 'select',
      //         options: {
      //           listItems: [
      //             { text: '공정완료', value: 'PIN' },
      //             { text: '완제품등록대기중', value: 'PIY' }
      //           ],
      //         }
      //       }
    }
  ]
});

async function getProDetail(){
  await fetch("ajax/selectProQuality")
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid1.resetData(res);
  })
};

getProDetail();


const grid2 = new tui.Grid({
  el : document.getElementById('grid2'),
  scrollX : false,
  scrollY : true,
  rowHeaders: ['checkbox'],
  columns : [
    {
      header : '완제품Lot코드',
      name : 'productLotCode',
      align : "center",
    },
    {
      header : '이물질',
      name : 'foreignExist',
      align : "center",
      formatter : 'listItemText',
      // editingEvent : 'click',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '유', value: 'PFY' },
                  { text: '무', value: 'PFN' }
                ],
              }
            }
    },
    {
      header : '포장상태',
      name : 'packStatus',
      align : "center",
      formatter : 'listItemText',
      // editingEvent : 'click',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '양호', value: 'PSY' },
                  { text: '불량', value: 'PSN' }
                ],
              }
            }
    },
    {
      header : '첨가제유무',
      name : 'addStand',
      align : "center",
      formatter : 'listItemText',
      // editingEvent : 'click',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '불량', value: 'ACN' },
                  { text: '양호', value: 'ACY' }
                ],
              }
            }
    },
    {
      header : '제품중량',
      name : 'productWeight',
      align : "center",
      formatter : 'listItemText',
      // editingEvent : 'click',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '불량', value: 'PWN' },
                  { text: '양호', value: 'PWY' }
                ],
              }
            }
    },
    {
      header : '입고수량',
      name : 'warehousingCnt',
      align : "center",
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
      header : '판매가능여부',
      name : 'lastResult',
      align : "center",
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


//grid2 입력값
grid2.on('afterChange', event => {
  console.log(event.changes[0]); //0번째 배열에 정보가 들어있음
  let ev = event.changes[0];

  let goodPd = grid2.getRow(ev.rowKey).goodCnt;
  console.log('goodPd : ', goodPd)
  if (goodPd == 0 || goodPd == ''){
    grid2.setValue(ev.rowKey,'lastResult','PRN');
  }

  let foreign = grid2.getRow(ev.rowKey).foreignExist;
  let pack = grid2.getRow(ev.rowKey).packStatus;
  let addSt = grid2.getRow(ev.rowKey).addStand;
  let weight = grid2.getRow(ev.rowKey).productWeight;

  if (foreign == 'PFN' && pack == 'PSY' && addSt == 'ACY' && weight == 'PWY' && goodPd > 0){
    grid2.setValue(ev.rowKey,'lastResult','PRY');
  }

  let whc = grid2.getValue(ev.rowKey,'warehousingCnt');
  console.log(event.changes[0].columnName);
  if(event.changes[0].columnName == 'goodCnt'){
    if(event.changes[0].value > whc){
      alert("적합수량이 입고수량을 초과하였습니다");
      grid2.setValue(ev.rowKey,'goodCnt',whc);
    }
  }
})

// grid2 완제품 품질입력
function insertProDtl(insertPro){
	fetch(`ajax/selectProQuality?selectProQuality=${insertPro}`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
    console.log("insertProDtl: ", res);
		grid2.resetData(res);
	})
};

insertProDtl();

function selectProQual(){
	fetch(`ajax/selectProQual`)
	.then(res => res.json())
	.then(res => {
		// ajax로 불러온 데이터 그리드에 넣음
    console.log("selectProQual: ", res);
		grid2.resetData(res);
	})
};

selectProQual();

//버튼누르면 적합수량->적합 수량에 insert & 입고 수량에 update
function addProQual(){
  fetch(`ajax/addProQual`)
  .then(res => res.json())
	.then(res => {
    grid2.resetData(res);
})
}