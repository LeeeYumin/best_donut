const initGrid = () => {
    // 그리드 객체
    const Grid = tui.Grid;

    /**
     * Grid 테마 커스텀
     * Grid.applyTheme('striped', {...}) : 
     * @param {String} default : 프리셋 (기본)
     * @param {String} striped : 프리셋 (줄무늬)
     * @param {String} clean : 프리셋 (클린)
     *      - preset theme name. Available values are 'default', 'striped' and 'clean'.
     *      - https://nhn.github.io/tui.grid/latest/Grid#applyTheme
     */
    Grid.applyTheme('defualt',  {
        cell: {
            normal: {
                border: 'black'
            },
            header: {
                background: 'gray',
                text: 'white'
            },
            evenRow: {
                background: '#fee'
            }
        }
    });

    /**
     * 그리드 설정
     * @variable {Dom} el : 그리드 element(DOM)
     * @variable {boolean} scrollX : X 스크롤 사용여부
     * @variable {boolean} scrollY : Y 스크롤 사용여부
     * @variable {boolean} draggable : 드레그 사용 여부
     * @variable {Object} header
     *      - @variable {Number} height : 헤더 높이
     * @variable {Number} bodyHeight : 그리드 바디 높이
     * @variable {*} contextMenu : 마우스 우클릭 옵션
     * @variable {Array} columns :
     *      - @variable {String} header : 컬럼명(헤더)
     *      - @variable {String} name : 컬럼 name (input data와 이름이 일치해야함)
     *      - @variable {String} align : 정렬
     *      - @variable {Number} width : 너비
     *      - @variable {String} whiteSpace : 줄바꿈 설정
     *      - @variable {Function} formatter : 출력 포멧
     * 기타 옵션은 공식 document를 참조하자.
     */
    
    const sampleGrid = new Grid({
        el: document.getElementById('gridDiv'),
        scrollX: true,
        scrollY: true,
        draggable: false,
        header: { height: 30 },
        bodyHeight: 200,
        contextMenu: null,
        columns: [
            {
                header: '날짜',
                name: 'date',
                align: "center",
                width: 150,
                whiteSpace: 'normal',
                formatter: function (e) {
                    return e.value
                },
            },
            {
                header: '이름',
                name: 'name',
                align: "left",
                width: 100,
                whiteSpace: 'normal',
                formatter: function (e) { 
                    return e.value
                },
            },
            {
                header: '위치',
                name: 'location',
                align: "left",
                width: 150,
                whiteSpace: 'normal',
                formatter: function (e) {
                    return e.value
                },
            },
        ]
    });

    return sampleGrid;
}

window.onload = () => {
    // 그리드 설정
    const createdGrid = initGrid();

    // 샘플 데이터
    const sampleData = [
        {
            date: '2022-12-04',
            name: '석봉박1',
            location: '부천',
        },
        {
            date: '2022-12-07',
            name: '석봉박2',
            location: '마곡',
        },
        {
            date: '2022-12-12',
            name: '석봉박3',
            location: '충주',
        }
    ];

    // 그리드에 데이터 넣기(출력)
    createdGrid.resetData(sampleData);
}