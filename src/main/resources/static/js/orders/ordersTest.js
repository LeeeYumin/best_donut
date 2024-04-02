class CustomTextEditor {
  constructor(props) {
    const el = document.createElement('input');
    const { maxLength } = props.columnInfo.editor.options;

    el.type = 'text';
    el.maxLength = maxLength;
    el.value = String(props.value);

    this.el = el;
  }
}

const gridData = [
  {
    name : 'name',
    artist : 'artist',
    type : 1,
    genre : 'genre',
    grade : 'grade'
  }
]

const grid = new tui.Grid({
  el: document.getElementById('grid'),
  scrollX: false,
  scrollY: false,
  columns: [
    {
      header: 'Name',
      name: 'name',
      editor: 'text'
    },
    {
      header: 'Artist',
      name: 'artist',
      editor: {
        type: CustomTextEditor,
        options: {
          maxLength: 10
        }
      }
    },
    {
      header: 'Type',
      name: 'typeCode',
      formatter: 'listItemText',
    },
    {
      header: 'Genre',
      name: 'genreCode',
      formatter: 'listItemText',
      editor: {
        type: 'checkbox',
        options: {
          listItems: [
            { text: 'Pop', value: '1' },
            { text: 'Rock', value: '2' },
            { text: 'R&B', value: '3' },
            { text: 'Electronic', value: '4' },
            { text: 'etc.', value: '5' }
          ]
        }
      },
      copyOptions: {
        useListItemText: true // when this option is used, the copy value is concatenated text
      }
    },
    {
      header: 'Grade',
      name: 'grade',
      copyOptions: {
        useListItemText: true
      },
      formatter: 'listItemText',
      editor: {
        type: 'radio',
        options: {
          listItems: [
            { text: '★☆☆', value: '1' },
            { text: '★★☆', value: '2' },
            { text: '★★★', value: '3' }
          ]
        }
      }
    }
  ]
});

console.log(gridData);
grid.resetData(gridData);

