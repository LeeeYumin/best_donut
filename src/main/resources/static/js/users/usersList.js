// tui.Grid.applyTheme('clean');

// 사용자권한
class ColumnConverter1 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 1 ? '영업' : '-';
  }
  getElement() {
      return this.el;
  }
}

class ColumnConverter2 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 1 ? '생산' : '-';
  }
  getElement() {
      return this.el;
  }
}

class ColumnConverter3 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 1 ? '자재' : '-';
  }
  getElement() {
      return this.el;
  }
}

class ColumnConverter4 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 1 ? '품질' : '-';
  }
  getElement() {
      return this.el;
  }
}

class ColumnConverter5 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 1 ? '설비' : '-';
  }
  getElement() {
      return this.el;
  }
}


// 사용자상태
class ColumnConverter6 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 'USY' ? '활성' : '비활성';
      // this.el.setAttribute('style','font-size : 12px');

      // if(props.formattedValue == 'USY') {
      //   this.el.setAttribute('class', 'badge bg-label-primary');
      // } else {
      //   this.el.setAttribute('class', 'badge bg-label-dark');
      // }
  }
  getElement() {
      return this.el;
  }
}


// 토스트ui 그리드
const grid = new tui.Grid({
  el: document.getElementById('usersList'),
  scrollX: false,
  scrollY: false,
  rowHeaders: ['rowNum'],
  header: {
      height: 70,
      complexColumns: [
	        {
	          header: '사용자권한',
	          name: 'mergeColumn1',
			  childNames: ['perm1', 'perm2', 'perm3', 'perm4', 'perm5']
	        },
	  ]
  },
  columns: [
    {
      header: '사용자코드',
      name: 'usersCode',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    },
    {
      header: '사용자명',
      name: 'usersName',
      sortingType: 'asc',
      sortable: true,
      align: 'center',
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    },
    {
      header: '영업관리',
      name: 'perm1',
      align: 'center',
      renderer: {type: ColumnConverter1},
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    },
    {
      header: '생산관리',
      name: 'perm2',
      align: 'center',
      renderer: {type: ColumnConverter2},
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    },
    {
      header: '자재관리',
      name: 'perm3',
      align: 'center',
      renderer: {type: ColumnConverter3},
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    },
    {
      header: '품질관리',
      name: 'perm4',
      align: 'center',
      renderer: {type: ColumnConverter4},
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    },
    {
      header: '설비관리',
      name: 'perm5',
      align: 'center',
      renderer: {type: ColumnConverter5},
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    },		    	    			        
    {
      header: '사용자상태',
      name: 'usersStatus',
      align: 'center',
      renderer: {type: ColumnConverter6},
      validation: {
        validatorFn: (value, row, columnName) => row['usersStatus'] == 'USY'
      }
    }
  ]
});

		 	

		    
		    

/* 			const state = {
			  code: 'eq',
			  value: 'USE00001'
			};
			const filterState = {columnName: 'usersCode', columnFilterState: state };
			const filterOpt = {
					  type: 'text',
					  showApplyBtn: true,
					  showClearBtn: false,
					  operator: 'OR',
					}; */
		    
				
 /*  			async function getUsersList(){
				const keyword = document.getElementById('keyword').value;
				const status = document.getElementsByName('status')[0].value;
				console.log(status);
				await fetch("/ajax/users?keyword=" + keyword + "&status=" + status)
				.then(res => res.json())
				.then(res => {
					grid.resetData(res)
				})
			}; */






// 전체조회
getUsersList();
async function getUsersList() {
  const keyword = document.getElementById('keyword').value;
  const permList = document.querySelectorAll("[name=perm]:checked");
  const usersStatus = document.querySelector("[name=usersStatus]:checked").value;
  
  const list = [];
  for(i = 0; i < permList.length; i++) {
    list.push(permList[i].value);
  }

  const obj = {keyword : keyword, permList : list, usersStatus : usersStatus};
  const data = {
    method : 'POST',
    headers: jsonHeaders,
    body : JSON.stringify(obj)
  };
  
  await fetch('/ajax/userslist', data)
  .then(res => res.json())
  .then(res => {
    console.log(res)
    grid.resetData(res)
  })
};
			

			
 			

			
/* 			const code1 = ''; */
			// async function searchValue(){
			// const code1 = document.getElementById('search').value;
			// console.log(code1);
			
			
 			// const state1 = {
 			// 		  code: 'contain',
 			// 		  value: code1
 			// 		};
			
				
			// 	await fetch("/ajax/users")
			// 	.then(res => res.json())
			// 	.then(res => {
			// 		grid.resetData(res)
			// 	})
			// 	.then(res => {
			// 		grid.filter('usersCode', [state1])
			// 	})
			
			// }


// 초기화버튼
document.getElementById('resetBtn').addEventListener('click', () => {
	document.getElementById('keyword').value = '';
  document.getElementById('perm0').checked = false;
  const perm = document.getElementsByName('perm');
  for(i = 0; i < perm.length; i++) {
    perm[i].checked = false;
  }
  document.getElementById('status0').checked = true;
	getUsersList();
});


// 검색버튼
document.getElementById('searchBtn').addEventListener('click', getUsersList);
document.getElementById('keyword').addEventListener('keyup', (e) => {
  if(e.keyCode == 13) {
    getUsersList();
  }
})


// 체크박스
document.getElementById('perm').addEventListener('click', checkAll);
document.getElementById('perm0').addEventListener('click', checkMaster);

function checkAll(){
  const checkBoxes = document.querySelectorAll("[name=perm]");
  const checked = document.querySelectorAll("[name=perm]:checked");
  const master = document.querySelector("[name=master]");

  if(checkBoxes.length == checked.length) {
    master.checked = true;
  } else {
    master.checked = false;
  }
}

function checkMaster(){
  const checkBoxes = document.getElementsByName('perm');
  const master = document.querySelector("[name=master]");

  checkBoxes.forEach((checkbox) => {
    checkbox.checked = master.checked;
  })
}


// 단건조회 이동
grid.on('dblclick', (event) => {
	let usersCode = grid.getValue(event.rowKey, 'usersCode')
  location.href = 'usersinfo/' + usersCode
})


// Hover
tui.Grid.applyTheme('custom', {
  row: {
    hover: {
      background: '#d4e9f2'
    }
  }
});