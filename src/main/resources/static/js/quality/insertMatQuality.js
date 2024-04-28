//이 함수 먼저 실행(위치)
getMatInfo('','','');

class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 0;
		el.step = 1;
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

// grid 생성
const grid = new tui.Grid({
  el : document.getElementById('grid'),
  bodyHeight: 500,
  scrollX : false,
  scrollY : true,
  pageOptions: {
    useClient: true,
    type: 'scroll',
    perPage: 20
  },
  rowHeaders: ['checkbox'],
  columns : [
    {
      header : '자재LOT코드',
      name : 'matLotCode',
      align : "center",
      sortable: true,
    },
    {
      header : '자재코드',
      name : 'matCode',
      align : "center",
      sortable: true,
    },
    {
      header : '자재명',
      name : 'matName',
      align : "center",
      sortable: true,
    },
    {
      header : '입고날짜',
      name : 'inputDate',
      align : "center",
      sortable: true,
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
      hidden : true
    },
    {
      header : '자재입출코드',
      name : 'matInoutCode',
      align : "center",
      // nativeEvent : 'Event',
      hidden : true
    }
  ]
});

//사이드바 자재품질등록 클릭시 grid에 출력
async function getMatInfo(matLotCode, inoutDate, inoutDate2){
  const param = `matLotCode=${matLotCode}&inoutDate=${inoutDate}&inoutDate2=${inoutDate2}`
  await fetch("ajax/matInfo?"+param)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid.resetData(res);
  })
};


//자재lot, 날짜(범위)로 검색
function findMat() {
  let matLotCode = document.querySelector('#matLOT').value;
  let inoutDate = document.querySelector('#inDate').value; //#id
  let inoutDate2 = document.querySelector('#inDate2').value;
  getMatInfo(matLotCode, inoutDate, inoutDate2);
}

//부적합기준(total) 변경 + 입고수량보다 많이 입력할 경우 알림
grid.on('afterChange', event => {
  console.log(event.changes[0]); //0번째 배열에 정보가 들어있음
  let ev = event.changes[0];
  if (ev.value == 'IV2' || ev.value == 'PFY' || ev.value == 'PSN'){
      //IV2 차량검사 부적합 PFY 이물질 유 PSN 포장상태 불량
    grid.setValue(ev.rowKey,'lastResult','MCN'); //total값은 부적합
  }

  let vehicle = grid.getRow(ev.rowKey).warehousingVehiclesCheck;
  let foreign = grid.getRow(ev.rowKey).foreignExist;
  let pack = grid.getRow(ev.rowKey).packStatus;

  if (vehicle == 'IV1' && foreign == 'PFN' && pack == 'PSY'){
      //위와 반대로 다 적합일 경우 total값 적합으로 변경
    grid.setValue(ev.rowKey,'lastResult','MCY');
  }

  console.log(event.changes[0].columnName);
  if(event.changes[0].columnName == 'goodCnt'){
    //적합수량 유효성 검사
    if(event.changes[0].value > grid.getValue(ev.rowKey,'inoutCnt')){
      alert("입고수량을 초과하였습니다");
      grid.setValue(ev.rowKey,'goodCnt',null);
    }
  }
})

//체크하고 등록하면 목록에서 사라지고 재고에 수량, 상태 업데이트
async function insertMat() {
  const checkedRows = grid.getCheckedRows()
  console.log(checkedRows);
    await fetch("ajax/insertMatQ",{
      method : 'post',
      headers : jsonHeaders,
      body : JSON.stringify(checkedRows),
    })
    .then (res => res.json())
    .then (res => {
      console.log(res);

      //sweetalter2
      if(res){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "자재 품질 등록 완료!",
          text: "자재 품질이 정상적으로 등록되었습니다.",
          showConfirmButton: false,
          timer: 2000,
        });
        getMatInfo('','','');
      }
      else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "자재 품질 등록 실패",
          text: "품질 등록에 실패했습니다. 항목을 확인해주세요.",
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
}

//검색일자 초기화
//document.getElementById("inDate2").value=today();
//document.getElementById("inDate").value=addDate(0,0,-7);