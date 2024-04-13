getTodayIns();
//getProcessInfo('PID00009');

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
        result = "진행중";
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
      header : '담당자',
      name : 'usersCode',
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
      header : '미생산수량',
      name : 'notProdCnt',
      align: 'center'
    },
    {
      header : '생산수량',
      name : 'prodCnt',
      align: 'center'
    },
    {
      header : '공정상태', //수정하기
      name : 'procStatus',
      align: 'center'
    },
  ]
});

// 당일 생산지시 조회
async function getTodayIns(){
  await fetch("/ajax/todayProdIns")
  .then(res => res.json())
  .then(res => {
    //console.log(res);

    todayIns.resetData(res.prodIns); //ServiceImpl에서 넘겨 준 변수명
    todayInsD.resetData(res.prodInsDe);
  })
};

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
      editor: 'text'
    },
    {
      header : '진행상태',
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
  const ucode = procInfo.getData()[row].usersCode;

  const btime = procInfo.getData()[row].beginTime;
  const etime = procInfo.getData()[row].endTime;

    // if(row == null) {
    //   alert.innerHTML = '<span style="color:red">※</span> 시작할 공정을 선택하세요.';
    //   return false;
    // }
  //담당자 정보
    if (ucode == null || ucode == '') {
      alert.innerHTML = '<span style="color:red">※</span> 담당자 정보를 입력하세요.';
      return false;
    }
    
    if ( btime != null && etime != null ) {
      alert.innerHTML = '<span style="color:red">※</span> 이미 완료된 공정입니다.';
      return false;
    } else  if ( btime != null ) {
      alert.innerHTML = '<span style="color:red">※</span> 이미 진행 중인 공정입니다.';
      return false;
    } 
    // if(btime != null || btime != '') {
    //   alert.innerHTML = '<span style="color:red">※</span> 이미 진행 중인 공정입니다.';
    //   return false;
    // }

    // if(btime != null && etime != null) {
    //   alert.innerHTML = '<span style="color:red">※</span> 이미 완료된 공정입니다.';
    //   return false;
    // }


  alert.innerHTML = '';
  return true;
}
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
async function startProc() {
  //procInfo.blur();

  if(!beforeStartCheck()) {
    return;
  }

  const row = procInfo.getFocusedCell().rowKey;
  const pcode = procInfo.getData()[row].procDetailCode;
  const ecode = procInfo.getData()[row].eqmCode;
  const ucode = procInfo.getData()[row].usersCode;
  
  let param = {procDetailCode: pcode, eqmCode: ecode, usersCode: ucode}
  console.log(param);

  await fetch('ajax/updateBeginTime', {
    method: 'post',
    headers: jsonHeaders,
    body : JSON.stringify(param)
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    //getProcessInfo(res.procDetailCode);
  });
}
//공정 종료하기
async function endProc() {

  if(!beforeEndCheck()) {
    return;
  }

  const row = procInfo.getFocusedCell().rowKey;
  const pcode = procInfo.getData()[row].procDetailCode;
  const ecode = procInfo.getData()[row].eqmCode;
  
  let param = {procDetailCode: pcode, eqmCode: ecode}
  console.log(param);

  await fetch('ajax/updateEndTime', {
    method: 'post',
    headers: jsonHeaders,
    body : JSON.stringify(param)
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    //그리드만 새로 로딩되는 거?
    //getProcessInfo(res.procDetailCode);
  });
}