class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'number';
		el.min = 0;
		el.step = 1;
    el.width = 5;
		el.maxLength = maxLength;
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

const grid = new tui.Grid({
  el : document.getElementById('grid'),
  scrollX : false,
  scrollY : true,
  columns : [
    // {
    //   header : '연번',
    //   name : '',
    //   align : "center",
    // },
    {
      header : 'BOM 코드',
      name : 'bomCode',
      align : "center",
    },
    {
      header : '제품명',
      name : 'productName',
      align : "center",
    },
    {
      header : '적용여부',
      name : 'applyStatus',
      align : "center",
    },
    {
      header : '담당자코드',
      name : 'usersCode',
      align : "center",
    },
    {
      header : '작성일자',
      name : 'writeDate',
      align : "center",
    }
  ]
});

const grid2 = new tui.Grid({
  el : document.getElementById('grid2'),
  scrollX : false,
  scrollY : true,
  columns : [
    // {
    //   header : '연번',
    //   name : '',
    //   align : "center",
    // },
    {
      header : '자재명',
      name : 'matName',
      align : "center",
    },
    {
      header : '자재코드',
      name : 'matCode',
      align : "center",
    },
    {
      header : '단가',
      name : 'unitPrice',
      align : "center",
    },
    {
      header : '단위',
      name : 'unit',
      align : "center",
    },
    {
      header : '소요수량',
      name : 'needCnt',
      align : "center",
    },
    {
      header : '공정명',
      name : 'procName',
      align : "center",
    }
  ]
});

async function getListBom(){
  await fetch("ajax/bomList")
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid.resetData(res);
  })
};

getListBom();

//selectbox 선택시 해당 상품 출력
async function getSelListBom(){
  await fetch("ajax/bomselList")
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid2.resetData(res);
  })
};

getSelListBom();