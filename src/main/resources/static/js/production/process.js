getTodayIns();

//생산지시 진행상태
// 설비상태
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