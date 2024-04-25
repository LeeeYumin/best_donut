getUnfitProd();

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
    {
      header : '완제품코드',
      name : 'productCode',
      align : "center",
    },
    {
      header : '생산요청 상세코드',
      name : 'prodReqDetailCode',
      align : "center",
    },
    {
      header : '완제품Lot코드',
      name : 'productLotCode',
      align : "center",
    },
    {
      header : '최종결과',
      name : 'lastResult',
      align : "center",
      formatter : 'listItemText',
    }
  ]
});

	grid.on('beforeChange', ev => {
		      console.log('before change:', ev);
		    });

  grid.on('afterChange', ev => {
    console.log('after change:', ev);
  })

	async function getUnfitProd(){
	  await fetch(`ajax/unfitProd`)
	  .then(res => res.json())
	  .then(res => {

	    console.log(res);
	    grid.resetData(res);
	  })
	};

  //완제품Lot번호, 검사접수일자로 검색
  function findUnfit() {
    let prodLot = document.querySelector('#prodLOT').value;
    let checkDate = document.querySelector('#inDate').value; //#id
    getUnfitProd(prodLot, checkDate);
  }

