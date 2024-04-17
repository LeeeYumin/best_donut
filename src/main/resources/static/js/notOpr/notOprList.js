// tui.Grid.applyTheme('clean');

// 비가동구분
class ColumnConverter1 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = converter1(props.formattedValue);
  }
  getElement() {
      return this.el;
  }
}

function converter1(value){
  let result;
  if(value == "NO1") {
      result = "설비고장";
  } else if(value == "NO2") {
      result = "설비점검";
  } else if(value == "NO3") {
      result = "설비수리";
  }
  return result;
}


// 토스트ui 그리드
const grid = new tui.Grid({
  el: document.getElementById('notOprList'),
  scrollX: false,
  scrollY: false,
  rowHeaders: ['rowNum'],
  columns: [
    {
      header: '비가동코드',
      name: 'notOprCode',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['endDate'] != null
      }
    },
    {
      header: '설비코드',
      name: 'eqmCode',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['endDate'] != null
      }
    },
    {
      header: '설비명',
      name: 'eqmName',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['endDate'] != null
      }
    },
    {
      header: '비가동구분',
      name: 'notOprSep',
      align: 'center',
      renderer: {type: ColumnConverter1},
      validation: {
        validatorFn: (value, row, columnName) => row['endDate'] != null
      }
    },
    {
      header: '시작일자',
      name: 'beginDate',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['endDate'] != null
      }
    },
    {
      header: '종료일자',
      name: 'endDate',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['endDate'] != null
      }
    },
    {
      header: '담당자명',
      name: 'usersName',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['endDate'] != null
      }
    }
  ]
});


// 전체조회
getNotOprList();
async function getNotOprList(){
  const keyword = document.getElementById('keyword').value;
  const noneDate = document.getElementById('noneDate').value;
  const status = document.querySelector("[name=status]:checked").value;
  console.log(noneDate);
  
  const obj = {keyword : keyword, noneDate : noneDate, status : status};
  const data = {
    method : 'POST',
      headers: jsonHeaders,
    body : JSON.stringify(obj)
  };
  
  await fetch('/ajax/notoprlist', data)
  .then(res => res.json())
  .then(res => {
    console.log(res)
    grid.resetData(res)
  })
};


// 초기화버튼
document.getElementById('resetBtn').addEventListener('click', () => {
	document.getElementById('keyword').value = '';
  document.getElementById('status0').checked = true;
	getNotOprList();
});


// 검색버튼
document.getElementById('searchBtn').addEventListener('click', getNotOprList);
document.getElementById('keyword').addEventListener('keyup', (e) => {
  if(e.keyCode == 13) {
    getNotOprList();
  }
})


// 단건조회 이동
grid.on('dblclick', (event) => {
	let notOprCode = grid.getValue(event.rowKey, 'notOprCode')
  location.href = 'notoprinfo/' + notOprCode
})


// Hover
tui.Grid.applyTheme('custom', {
  row: {
    hover: {
      background: '#d4e9f2'
    }
  }
});