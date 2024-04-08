getProdPlanList();

//생산계획 진행상태
class PlanStatus {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        this.el.innerText = props.formattedValue == 'LS1' ? '미지시' : '지시등록';
    }
    getElement() {
        return this.el;
    }
}
//생산요청코드 없으면 '-'로 표시
class ProdReqCode {
    constructor(props) {
        const el = document.createElement('div');

        this.el = el;
        this.render(props);
    }
    render(props) {
        this.el.innerText = props.formattedValue == '' ? '-' : props.formattedValue;
    }
    getElement() {
        return this.el;
    }
}

const grid1 = new tui.Grid({
    el: document.getElementById('prodPlanList'),
    scrollX: false,
    scrollY: false,
    columns: [
        {
            header: '생산계획코드',
            name: 'prodPlanCode',
            align: 'center'
        },
        {
            header: '생산계획일자',
            name: 'planDate',
            align: 'center',

        },
        {
            header: '생산요청코드',
            name: 'prodReqCode',
            align: 'center',
            renderer: { type: ProdReqCode }
        },
        {
            header: '진행상태',
            name: 'prodPlanStatus',
            align: 'center',
            renderer: { type: PlanStatus }
        },
        {
            header: '담당자',
            name: 'usersCode',
            align: 'center'
        }
    ]
});

function getProdPlanList() {
    const startDate = '';
    const endDate = '';
    const planCode = '';

    const obj = { startDate, endDate, planCode };
    console.log(obj);

    const data = {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(obj)
    };

    fetch("/ajax/prodPlanList", data)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            grid1.resetData(res);
        })
};