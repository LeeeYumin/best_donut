// tui.Grid.applyTheme('clean');

// 변환
class ColumnConverter {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 'USY' ? '활성' : '비활성';
  }
  getElement() {
      return this.el;
  }
}

// 변환2
class ColumnConverter2 {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = props.formattedValue == 1 ? '권한보유' : '';
  }
  getElement() {
      return this.el;
  }
}

/*문자 변환 함수*/
// function converter(value){
//     let result;
//     if(value=="USY"){
//         result = "활성";
//     }else if(value=="USN"){
//         result="비활성";
//     }

//     return result;
// }

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
      filter: 'text'
    },
    {
      header: '사용자명',
      name: 'usersName',
      sortingType: 'asc',
      sortable: true,
      align: 'center'
    },
    {
      header: '영업',
      name: 'perm1',
      align: 'center',
      renderer: {type: ColumnConverter2}
    },
    {
      header: '생산',
      name: 'perm2',
      align: 'center',
      renderer: {type: ColumnConverter2}
    },
    {
      header: '자재',
      name: 'perm3',
      align: 'center',
      renderer: {type: ColumnConverter2}
    },
    {
      header: '품질',
      name: 'perm4',
      align: 'center',
      renderer: {type: ColumnConverter2}
    },
    {
      header: '설비',
      name: 'perm5',
      align: 'center',
      renderer: {type: ColumnConverter2}
    },		    	    			        
    {
      header: '사용자상태',
      name: 'usersStatus',
      align: 'center',
      renderer: {type: ColumnConverter}
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
			
   			async function getUsersList(){
/*				const keyword = document.getElementById('keyword').value;
				const status = document.getElementsByName('status')[0].value;
				console.log(status);
				let param = "keyword=" + keyword + "&status=" + status;*/
				
				const keyword = document.getElementById('keyword').value;
        const permList = document.querySelectorAll("[name=perm]:checked");
        const status = document.querySelector("[name=status]:checked").value;
        // console.log(permList[0].value);
				
        const list = [];
  
        for(i = 0; i < permList.length; i++) {
          list.push(permList[i].value);
        }

				const obj = {keyword : keyword, status : status, permList : list};

				const data = {
					method : 'POST',
					  headers: jsonHeaders,
					body : JSON.stringify(obj)
				};

        console.log(data);
				
				await fetch('/ajax/users', data)
				.then(res => res.json())
				.then(res => {
          console.log(res)
					grid.resetData(res)
				})
			};
			
			getUsersList();
			
/* 			const code = 'USE00001'; */

			
 			

			
/* 			const code1 = ''; */
			async function searchValue(){
			const code1 = document.getElementById('search').value;
			console.log(code1);
			
			
 			const state1 = {
 					  code: 'contain',
 					  value: code1
 					};
			
				
				await fetch("/ajax/users")
				.then(res => res.json())
				.then(res => {
					grid.resetData(res)
				})
				.then(res => {
					grid.filter('usersCode', [state1])
				})
			
			}

      
// 검색버튼
document.getElementById('searchBtn').addEventListener('click', getUsersList);

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

