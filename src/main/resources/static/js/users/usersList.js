tui.Grid.applyTheme('clean');

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
			  childNames: ['businessPerm', 'prodPerm', 'matPerm', 'qltyPerm', 'eqmMngPerm', 'master']
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
      name: 'businessPerm',
      align: 'center'
    },
    {
      header: '생산',
      name: 'prodPerm',
      align: 'center'
    },
    {
      header: '자재',
      name: 'matPerm',
      align: 'center'
    },
    {
      header: '품질',
      name: 'qltyPerm',
      align: 'center'
    },
    {
      header: '설비',
      name: 'eqmMngPerm',
      align: 'center'
    },		    
    {
      header: '마스터',
      name: 'master',
      align: 'center'
    },		    			        
    {
      header: '사용자상태',
      name: 'usersStatus',
      align: 'center'
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
        const status = document.querySelector("[name=status]:checked").value;
        console.log(status);
				
				const obj = {keyword : keyword, status : status};

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

/*  					grid.filter('usersCode', [state1]); */







// 검색
document.getElementById('searchBtn').addEventListener('click', getUsersList);








