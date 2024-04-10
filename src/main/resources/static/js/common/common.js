// 금액 포맷 함수('#,###')
function priceFormat(price) {

	if(price == null){
		return '';
	}

	let result = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	return result;
}

// 날짜 포맷 함수('yyyy/MM/dd')
function dateFormat(date) {

	if(date == null){
		return '';
	}

	let dateForm = new Date(date);
	let year = dateForm.getFullYear();
	let month = ('0' + (dateForm.getMonth() + 1)).slice(-2);
	let day = ('0' + dateForm.getDate()).slice(-2);
	let dateStr = `${year}-${month}-${day}`;
	return dateStr;
}

// week => yyyy-MM-dd 변환 함수
function weekFormat(week) {

	const y = parseInt(week.substring(0, 4));
	const w = parseInt(week.substring(6, 8));

	const simpleDate = new Date(y, 0, 1 + (w - 1) * 7);
	const dayOfWeek = simpleDate.getDay();
	const weekStart = simpleDate;

	if (dayOfWeek <= 4) {
		weekStart.setDate(simpleDate.getDate() - simpleDate.getDay() + 1);
	}
	else {
		weekStart.setDate(simpleDate.getDate() + 8 - simpleDate.getDay());
	}

	const weekEnd = new Date(weekStart);
	weekEnd.setDate(weekStart.getDate() + 6)

	return {weekStart, weekEnd};
}
