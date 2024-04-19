getTodayIns();
getEqmOpr();

// 생산관리자 권한 확인
if(document.querySelector('#auth').innerHTML != '1'){
	document.querySelector('#startProcBtn').setAttribute('style', 'display : none;');
	document.querySelector('#endProcBtn').setAttribute('style', 'display : none;');
}

//생산지시 진행상태
  class InsStatus {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        this.el.innerText = instructStatus(props.formattedValue);
    }
    getElement() {
        return this.el;
    }
  }

  function instructStatus(value){
    let result;
    if(value == "IS1") {
        result = "지시완료";
    } else if(value == "IS2") {
        result = "생산중";
    } else if(value == "IS3") {
        result = "생산완료";
    }
    return result;
  }

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
}

//설비가동현황
class EqmOprStatus {
  constructor(props) {
      const el = document.createElement('div');

      this.el = el;
      this.render(props);
  }
  render(props) {
    this.el.innerText = eqmOprStatus(props.formattedValue);
  }
  getElement() {
      return this.el;
  }
}

function eqmOprStatus(value){
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


// =============================================================
/* < 당일 생산지시 > */
const todayIns = new tui.Grid({
  el : document.getElementById('todayIns'),
  scrollX : false,
  scrollY : false,
  bodyHeight: 40,
  minBodyHeight: 40,
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
      header : '지시상태',
      name : 'prodInstructStatus',
      align: 'center',
      renderer: {type: InsStatus}
    }, 
    {
      header : '담당자코드',
      name : 'usersCode',
      align: 'center',
      hidden: true
    },
    {
      header : '담당자',
      name : 'usersName',
      align: 'center'
    }
  ]
});
/* < 당일 생산지시 상세 > */
const todayInsD = new tui.Grid({
  el : document.getElementById('todayInsD'),
  scrollX : false,
  scrollY : false,
  columns : [
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
      align: 'center'
    },
    {
      header : '자재불출',
      name : 'matOutgoingStatus',
      align: 'center'
    },
    {
      header : '진행상태', //수정하기
      name : 'insDeStatus',
      align: 'center'
    },
  ]
});

// 당일 생산지시 조회
  function getTodayIns(){
  fetch("/ajax/todayProdIns")
  .then(res => res.json())
  .then(res => {
    console.log(res);

    todayIns.resetData(res.prodIns); //ServiceImpl에서 넘겨 준 변수명
    todayInsD.resetData(res.prodInsDe);
  })
};

// function getTodayIns(){
//   fetch("/ajax/todayProdIns")
//   .then(res => res.json())
//   .then(res => {
//     console.log(res);

//     todayIns.resetData(res);
//   })
// };
// function getTodayInsDetail(piCode){
// 	fetch(`/ajax/todayProdInsDeStatus?prodInstructCode=${piCode}`)
// 	.then(res => res.json())
// 	.then(res => {
// 		todayInsD.resetData(res);
// 	})
// };
// // function getTodayInsDeStatus(pidCode){
// // 	fetch(`/ajax/todayProdInsDeStatus?prodInstructDetailCode=${pidCode}`)
// // 	.then(res => res.json())
// // 	.then(res => {
// // 		todayInsD.resetData(res);
// // 	})
// // };

// todayIns.on('click', e => {
// 	let piCode = todayIns.getValue(e.rowKey, "prodInstructCode");

//   // for(let i = 0; i < todayInsD.length; i++) {
//   //   let pidCode = todayInsD.getValue(i, "prodInstructDetailCode");
//   //   getTodayInsDeStatus(pidCode);
//   // }
// 	//완료 상세목록
// 	getTodayInsDetail(piCode);

// });

//==============================================================
/* < 공정 > */

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
const procMat = new tui.Grid({
  el : document.getElementById('procMat'),
  scrollX : false,
  scrollY : false,
  columns : [
    {
      header : '공정자재코드',
      name : 'procMatCode',
      align: 'center'
    },
    {
      header : '자재명',
      name : 'matName',
      align: 'center'
    },
    {
      header : '자재LOT코드',
      name : 'matLotCode',
      align: 'center'
    }, 
    {
      header : '수량',
      name : 'matCnt',
      align: 'center'
    }
  ]
});
//공정진행 정보 조회
//생산지시 상세 클릭 시 아래에 출력
todayInsD.on('click', e => {
  let pidCode = todayInsD.getValue(e.rowKey, "prodInstructDetailCode");

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

//공정자재 정보 조회
//공정진행 목록 클릭 시 옆에 출력
procInfo.on('click', e => {
  let prdCode = procInfo.getValue(e.rowKey, "procDetailCode");
  getProcMatInfo(prdCode);
})

async function getProcMatInfo(prdCode){
  await fetch(`/ajax/procMatInfo?procDetailCode=${prdCode}`)
  .then(res => res.json())
  .then(res => {
    //console.log(res);
    procMat.resetData(res);
  })
};

//==================================================================
/* < 공정 시작 & 종료 > */

//시작버튼 클릭 시 유효성 검사 (수정하기)
function beforeStartCheck() {
  const alert = document.getElementById('alertMsg');
  
  const row = procInfo.getFocusedCell().rowKey;
  //const ucode = procInfo.getData()[row].usersCode;

  const btime = procInfo.getData()[row].beginTime;
  const etime = procInfo.getData()[row].endTime;

  //설비 대기상태 확인
  const eqmCode = procInfo.getData()[row].eqmCode;
  const useEqm = eqmOpr.getData();
  for(let i = 0; i < useEqm.length; i++) {
    
    if(eqmCode == useEqm[i].eqmCode) {
      let status = useEqm[i].oprStatus;
      if(status == 'FO2') {
        alert.innerHTML = '<span style="color:red">※</span> 다른 공정에서 사용 중입니다.\n해당 설비가동현황이 대기일 시 다시 시작하세요.';
        return false;
      }
    }
  };

  //투입자재 유무 확인하기
  const insDrow = todayInsD.getFocusedCell().rowKey;
  const matCheck = todayInsD.getValue(insDrow, 'matOutgoingStatus');
  console.log(matCheck);
  if(matCheck == 'X') {
    alert.innerHTML = '<span style="color:red">※</span> 자재 미불출 상태로 공정을 시작할 수 없습니다.';
    return false;
  };

  //공정순서


  //선택된 공정 없을 경우
    // if(row == null) {
    //   alert.innerHTML = '<span style="color:red">※</span> 시작할 공정을 선택하세요.';
    //   return false;
    // }
    
    if (btime != null && etime != null) {
      alert.innerHTML = '<span style="color:red">※</span> 이미 완료된 공정입니다.';
      return false;
    } else  if (btime != null) {
      alert.innerHTML = '<span style="color:red">※</span> 이미 진행 중인 공정입니다.';
      return false;
    } 



  alert.innerHTML = '';
  return true;
}
//종료버튼 클릭 시 유효성 검사
function beforeEndCheck() {
  const alert = document.getElementById('alertMsg');
  
  const row = procInfo.getFocusedCell().rowKey;

  const btime = procInfo.getData()[row].beginTime;
  const etime = procInfo.getData()[row].endTime;

  // if(row == null) {
  //   alert.innerHTML = '<span style="color:red">※</span> 종료할 공정을 선택하세요.';
  //   return false;
  // }

  if ( btime == null ) {
    alert.innerHTML = '<span style="color:red">※</span> 아직 시작되지 않은 공정입니다.';
    return false;
  } else if ( btime != null && etime != null ) {
    alert.innerHTML = '<span style="color:red">※</span> 이미 종료된 공정입니다.';
    return false;
  }
  // if(etime != null || etime != '') {
  //   alert.innerHTML = '<span style="color:red">※</span> 이미 종료된 공정입니다.';
  //   return false;
  // }

  alert.innerHTML = '';
  return true;
}

//공정 시작하기
function startProc() {
  //procInfo.blur();

  if(!beforeStartCheck()) {
    return;
  }

  const row = procInfo.getFocusedCell().rowKey;

  // const pcode = procInfo.getValue(row, "procDetailCode");
  const pdcode = procInfo.getValue(row, "prodInstructDetailCode");
  // const ecode = procInfo.getValue(row, "row].eqmCode;
  // const ucode = procInfo.getData()[row].usersCode;

  const picode = todayIns.getValue(0, 'prodInstructCode');
  
  let param = procInfo.getRow(row);
  param.se = 's';
  param.prodInstructCode = picode;
  param.prodInstructDetailCode = pdcode;
  param.usersCode = document.querySelector('#usersCode').value;
  console.log(param.usersCode)


  console.log(param);

  fetch('ajax/updateProc', {
    method: 'post',
    headers: jsonHeaders,
    body : JSON.stringify(param)
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);

    getProcessInfo(pdcode);
    getEqmOpr();
    getTodayIns();
  });
}
//공정 종료하기
function endProc() {

  if(!beforeEndCheck()) {
    return;
  }

  const row = procInfo.getFocusedCell().rowKey;
  // const pcode = procInfo.getData()[row].procDetailCode;
  // const ecode = procInfo.getData()[row].eqmCode;
  const picode = todayIns.getValue(0, 'prodInstructCode');
  const pdcode = procInfo.getValue(row, "prodInstructDetailCode");

  let param = procInfo.getRow(row);
  console.log(param);
  param.se = 'e';
  param.prodInstructCode = picode;
  param.prodInstructDetailCode = pdcode;

  fetch('ajax/updateProc', {
    method: 'post',
    headers: jsonHeaders,
    body : JSON.stringify(param)
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    
    getProcessInfo(pdcode);
    getEqmOpr();
    getTodayIns();
  });
}



//=======================================================
		/* 공정에 사용되는 설비 가동현황*/
			const eqmOpr = new tui.Grid({
				el: document.getElementById('eqmOpr'),
				scrollX: false,
				scrollY: true,
				bodyHeight: 200,
				//rowHeaders: ['rowNum'],
				columns: [
          {
            header : 'NO',
            name : 'serialNum',
            align: 'center'
          }, 
          {
          header : '설비코드',
          name : 'eqmCode',
          align: 'center'
          },
          {
            header : '설비명',
            name : 'eqmName',
            align: 'center'
          },
					{
						header: '가동현황',
						name: 'oprStatus',
						align: 'center',
						renderer: {type: EqmOprStatus}
					}
				]
			});

			// 설비조회(ajax)
			async function getEqmOpr(){
				await fetch("/ajax/procEqmInfo")
				.then(res => res.json())
				.then(res => {
					//console.log(res);
					eqmOpr.resetData(res);
				})
			};