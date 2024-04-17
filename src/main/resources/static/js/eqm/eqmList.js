// tui.Grid.applyTheme('clean');

// 설비상태
class ColumnConverter1 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = converter1(props.formattedValue);

      // if(props.formattedValue == 'ES1') {
      //   this.el.setAttribute('class', 'badge bg-label-primary');
      // } else {
      //   this.el.setAttribute('class', 'badge bg-label-dark');
      // }
  }
  getElement() {
      return this.el;
  }
}

function converter1(value){
  let result;
  if(value == "ES1") {
      result = "정상";
  } else if(value == "ES2") {
      result = "설비고장";
  } else if(value == "ES3") {
      result = "설비점검";
  } else if(value == "ES4") {
      result = "설비수리";
  } else if(value == "ES5") {
      result = "폐기";
  }
  return result;
}


// 가동현황
class ColumnConverter2 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
    this.el.innerText = converter2(props.formattedValue);
  }
  getElement() {
      return this.el;
  }
}

function converter2(value){
  let result;
  if(value == "FO1") {
      result = "대기";
  } else if(value == "FO2") {
      result = "가동중";
  } else if(value == "FO3") {
      result = "전원꺼짐";
  }
  return result;
}


// 토스트ui 그리드
const grid = new tui.Grid({
  el: document.getElementById('eqmList'),
  scrollX: false,
  scrollY: false,
  rowHeaders: ['rowNum'],
  columns: [
    {
      header: '설비코드',
      name: 'eqmCode',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['eqmStatus'] != 'ES5'
      }
    },
    {
      header: '설비명',
      name: 'eqmName',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['eqmStatus'] != 'ES5'
      }
    },
    {
      header: '모델명',
      name: 'modelName',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['eqmStatus'] != 'ES5'
      }
    },
    {
      header: '최근점검일',
      name: 'lastCheckDate',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['eqmStatus'] != 'ES5'
      }
    },
    {
      header: '설비상태',
      name: 'eqmStatus',
      align: 'center',
      renderer: {type: ColumnConverter1},
      validation: {
        validatorFn: (value, row, columnName) => row['eqmStatus'] != 'ES5'
      }
    },
    {
      header: '가동현황',
      name: 'oprStatus',
      align: 'center',
      renderer: {type: ColumnConverter2},
      validation: {
        validatorFn: (value, row, columnName) => row['eqmStatus'] != 'ES5'
      }
    }
  ]
});


// 전체조회
getEqmList();
async function getEqmList(){
  const keyword = document.getElementById('keyword').value;
  const status = document.querySelector("[name=status]:checked").value;
  const work = document.querySelector("[name=work]:checked").value;
  
  const obj = {keyword : keyword, status : status, work : work};
  const data = {
    method : 'POST',
      headers: jsonHeaders,
    body : JSON.stringify(obj)
  };
  
  await fetch('/ajax/eqmlist', data)
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
  document.getElementById('work0').checked = true;
	getEqmList();
});


// 검색버튼
document.getElementById('searchBtn').addEventListener('click', getEqmList);
document.getElementById('keyword').addEventListener('keyup', (e) => {
  if(e.keyCode == 13) {
    getEqmList();
  }
})


// 단건조회 이동
grid.on('dblclick', (event) => {
	let eqmCode = grid.getValue(event.rowKey, 'eqmCode')
  location.href = 'eqminfo/' + eqmCode
})


// Hover
tui.Grid.applyTheme('custom', {
  row: {
    hover: {
      background: '#d4e9f2'
    }
  }
});