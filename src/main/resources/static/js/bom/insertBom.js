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
    // {
    //   header : '제품 코드',
    //   name : 'productCode',
    //   align : "center",
    // },
    {
      header : '제품명',
      name : 'productName',
      align : "center",
    },
    {
      header : '적용여부',
      name : 'applyStatus',
      align : "center",
      formatter : 'listItemText',
      // editingEvent : 'click',
      editor: {
        options: {
          listItems: [
            { text: '적용', value: 'BAY' },
            { text: '미적용', value: 'BAN' }
          ],
          }
        }
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

async function getProdBom(){
  await fetch("ajax/insertBom")
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid.resetData(res);
  })
};

getProdBom();
