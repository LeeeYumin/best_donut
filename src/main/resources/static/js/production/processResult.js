//목록출력 기본날짜 (한달)

const d = new Date();
//const month = d.getMonth();
const date = d.getDate();

// 일주일 전 구하기
document.getElementById('searchStartDate').value = new Date(new Date().setDate(date - 7)).toISOString().substring(0, 10);
document.getElementById('searchEndDate').value = new Date().toISOString().substring(0, 10);

//로딩시 바로 실행
window.onload = function() {
	getProcResultList();
};  

//=================================================================
/* < 공정완료 목록 > */
const resultList = new tui.Grid({
	el : document.getElementById('resultList'),
	bodyHeight: 320,
	scrollX : false,
	scrollY : true,
	rowHeaders: ['rowNum'],
	columns : [
		
		{
			header : '생산지시일자',
			name : 'instructDate',
			align: 'center'
		}, 
		{
			header : '생산지시코드',
			name : 'prodInstructCode',
			align: 'center'
		}, 
		{
			header : '담당자',
			name : 'usersName',
			align: 'center'
		},
		// {
		// 	header : '전체시작시간',
		// 	name : 'allBeginTime',
		// 	align: 'center'
		// }, 
		// {
		// 	header : '전체종료시간',
		// 	name : 'allEndTime',
		// 	align: 'center'
		// }, 
		{
			header : '생산지시상세코드',
			name : 'prodInstructDetailCode',
			align: 'center'
		}, 	
		{
			header : '제품코드',
			name : 'productCode',
			align: 'center'
		},
		{
			header : '제품명',
			name : 'productName',
			align: 'center'
		},
		{
			header : '지시수량',
			name : 'instructCnt',
			//width: 60,
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
		{
			header : '미생산수량',
			name : 'notProdCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
		},
		{
			header : '생산수량',
			name : 'prodCnt',
			align: 'center',
			className:'changeColor',
			formatter: function(price) {
				return priceFormat(price.value);
			}
		},
		{
			header : '완제품LOT',
			name : 'productLotCode',
			align: 'center'
		},
		{
			header : '불량수량',
			name : 'failCnt',
			align: 'center',
			formatter: function(price) {
				return priceFormat(price.value);
			},
			validation : {
        validatorFn : value => value == 0
      }
		},
	]
});

// 공정완료 생산지시 목록 조회(ajax) -검색포함
async function getProcResultList(){

	const searchStartDate = document.getElementById('searchStartDate').value;
	const searchEndDate = document.getElementById('searchEndDate').value;
	const prodInstructCode = document.getElementById('prodInstructCode').value;
	const productLotCode = document.getElementById('productLotCode').value;
	const matLotCode = document.getElementById('matLotCode').value;
	const productCode = document.querySelector("[name=productCode]:checked").value;

	const obj = {searchStartDate, searchEndDate, prodInstructCode, matLotCode, productLotCode, productCode};
	//console.log(obj);
	
	const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(obj)
	};

	let response = await fetch("/ajax/processResult", data)
	let res = await response.json();
	resultList.resetData(res);

};

//검색버튼
document.getElementById('searchBtn').addEventListener('click', getProcResultList);
document.getElementById('prodInstructCode').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})
document.getElementById('productLotCode').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})
document.getElementById('matLotCode').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})
document.getElementById('productCode0').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})
document.getElementById('productCode1').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})
document.getElementById('productCode2').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})
document.getElementById('productCode3').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})
document.getElementById('productCode4').addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		getProcResultList();
	}
})

//초기화버튼
document.getElementById('resetBtn').addEventListener('click', function() {
	document.getElementById('searchStartDate').value = '';
	document.getElementById('searchEndDate').value = '';
	document.getElementById('prodInstructCode').value = '';
	document.getElementById('productCode0').checked = true;
	document.getElementById('productLotCode').value = '';
	document.getElementById('matLotCode').value = '';

	resultList.resetData([]);

	getProcResultList();
});


//===================================================
//생산지시 진행상태
class ProcStatus {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
      this.el.innerText = procStatus(props.formattedValue);
  }
  getElement() {
      return this.el;
  }
}

function procStatus(value){
  let result;
  if(value == "CS1") {
      result = "대기";
  } else if(value == "CS2") {
      result = "공정중";
  } else if(value == "CS3") {
      result = "공정완료";
  }
  return result;
};

const procInfo = new tui.Grid({
  el : document.getElementById('procInfo'),
  scrollX : false,
  scrollY : false,
  columns : [
    {
      header : 'NO',
      name : 'serialNum',
      align: 'center'
    },
    {
      header : '공정명',
      name : 'procName',
      align: 'center'
    }, 
    {
      header : '공정코드',
      name : 'procDetailCode',
      align: 'center'
    },
    {
      header : '설비코드',
      name : 'eqmCode',
      align: 'center'
    }, 
    {
      header : '시작시간',
      name : 'beginTime',
      align: 'center'
    },
    {
      header : '종료시간',
      name : 'endTime',
      align: 'center'
    },
    {
      header : '담당자',
      name : 'usersCode',
      align: 'center',
      hidden: true
    },
    {
      header : '담당자',
      name : 'usersName',
      align: 'center'
    },
    {
      header : '공정상태',
      name : 'procStatus',
      align: 'center',
      renderer: {type: ProcStatus}
    },
  ]
});

//공정상세 정보 조회
//클릭 시 아래에 출력
resultList.on('click', e => {
  let pidCode = resultList.getValue(e.rowKey, "prodInstructDetailCode");

  getProcessInfo(pidCode);
})

async function getProcessInfo(pidCode){
  await fetch(`/ajax/processInfo?prodInsDetailCode=${pidCode}`)
  .then(res => res.json())
  .then(res => {
    //console.log(res);
    procInfo.resetData(res);
  })
};





