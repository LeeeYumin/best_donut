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
      header : '자재명',
      name : 'matName',
      align : "center",
    },
    {
      header : '자재 코드',
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
      header : '소요량',
      name : 'needCnt',
      align : "center",
    },
    {
      header : '공정',
      name : 'procCode',
      align : "center",
    },
    {
      header : '거래처코드',
      name : 'companyCode',
      align : "center",
    }
  ]
});

async function getProdBom2(){
  await fetch("ajax/insertBom2")
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid.resetData(res);
  })
};

getProdBom();

