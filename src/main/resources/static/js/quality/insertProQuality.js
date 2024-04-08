

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
  rowHeaders: ['checkbox'],
  columns : [
    {
      header : '완제품코드',
      name : 'productCode',
      align : "center",
    },
    {
      header : '완제품명',
      name : 'productName',
      align : "center",
    },
    {
      header : '완제품Lot코드',
      name : 'productLotCode',
      align : "center",
    },
    {
      header : '생산완료일자',
      name : 'endTime',
      align : "center",
    },
    {
      header : '공정상태',
      name : 'procStatus',
      align : "center",
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '공정완료', value: 'PIN' },
                  { text: '완제품등록대기중', value: 'PIY' }
                ]
              }
            }
    }
  ]
});