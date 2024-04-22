class CustomNumberEditor {
	constructor(props) {
		const el = document.createElement('input');

		el.type = 'number';
		el.min = 0;
		el.step = 1;
    el.width = 5;

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
      sortable: true,
    },
    {
      header : '제품명',
      name : 'productName',
      align : "center",
      sortable: true,
    },
    {
      header : '적용여부',
      name : 'applyStatus',
      align : "center",
      sortable: true,
      formatter : 'listItemText',
      editor: {
        type : 'text',
        options : {
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
      sortable: true,
    }
  ],
  draggable: true
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
      formatter: function (price) {
        return priceFormat(price.value);
      }
    },
    {
      header : '소요수량',
      name : 'needCnt',
      align : "center",
    },
    {
      header : '단위',
      name : 'unit',
      align : "center",
    },
    {
      header : '공정코드',
      name : 'procCode',
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

//grid에서 클릭하면 grid2에서 내역 출력
grid.on('click', (event) => {
  // console.log(event.rowKey);
  let bomCode = grid.getValue(event.rowKey,"bomCode")

  console.log(bomCode);
  getBomEleList(bomCode);
})

async function getBomEleList(bomCode) {
  // let bomCode = grid2.getValue(grid2.getFocusedCell().rowKey,'bomCode');

  await fetch("ajax/bomselList?bomCode=" + bomCode)
      .then(res => res.json())
      .then(res => {
          // ajax로 불러온 데이터 그리드에 넣음
          grid2.resetData(res);
          console.log(res);
      })
};

