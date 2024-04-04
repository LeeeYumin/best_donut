
getMatInfo('','');

const grid = new tui.Grid({
  el : document.getElementById('grid'),
  scrollX : false,
  scrollY : true,
  rowHeaders: ['checkbox'],
  columns : [
    {
      header : '자재LOT코드',
      name : 'MAT_LOT_CODE',
      align : "center",
    },
    {
      header : '입고날짜',
      name : 'INOUT_DATE',
      align : "center",
      formatter: function(date) {
        let dateForm = new Date(date.value);
        let year = dateForm.getFullYear();
        let month = ('0' + (dateForm.getMonth() + 1)).slice(-2);
        let day = ('0' + dateForm.getDate()).slice(-2);
        let dateStr = `${year}-${month}-${day}`;
        return dateStr;
      }
    },
    {
      header : '입고수량',
      name : 'INOUT_CNT',
      align : "center",

    },
    {
      header : '입고차량검사',
      name : 'WAREHOUSING_VEHICLES_CHECK',
      align : "center",
      formatter : 'listItemText',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '적합', value: '1' },
                  { text: '부적합', value: '2' },
                  { text: '차량검사 해당없음', value: '3' }
                ],
              }
            }
    },
    {
      header : '이물질',
      name : 'FOREIGN_EXIST',
      align : "center",
      formatter : 'listItemText',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '유', value: '1' },
                  { text: '무', value: '2' }
                ]
              }
            }
    },
    {
      header : '포장상태',
      name : 'PACK_STATUS',
      align : "center",
      formatter : 'listItemText',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '양호', value: '1' },
                  { text: '불량', value: '2' }
                ]
              }
            }
    },
    {
      header : '부적합기준(total)',
      name : 'LAST_RESULT',
      align : "center",
      formatter : 'listItemText',
      editor: {
              type: 'select',
              options: {
                listItems: [
                  { text: '부적합', value: '1' },
                  { text: '적합', value: '2' }
                ]
              }
            }
    },
    {
      header : '부적합일지',
      name : 'BAD_SEP',
      align : "center",
      nativeEvent : 'Event',
    }
  ]

});

async function getMatInfo(matLotCode, inoutDate){
  await fetch("ajax/matInfo?matLotCode="+matLotCode+"&inoutDate="+inoutDate)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    grid.resetData(res);
  })
};


function findMat() {
  let matLotCode = document.querySelector('#matLOT').value;
  let inoutDate = document.querySelector('#inDate').value; //#id
  getMatInfo(matLotCode, inoutDate);
}


