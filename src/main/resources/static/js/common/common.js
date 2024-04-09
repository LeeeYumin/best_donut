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

// 금액 포맷 함수('#,###')
function priceFormat(price) {

	if(price == null){
		return '';
	}

	let result = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	return result;
}

// week => yyyy-MM-dd 변환 함수
function weekFormat(week) {

	const y = parseInt(week.substring(0, 4));
	const w = parseInt(week.substring(6, 8));

	const simpleDate = new Date(y, 0, 1 + (w - 1) * 7);
	const dayOfWeek = simpleDate.getDay();
	const ISOweekStart = simpleDate;

	if (dayOfWeek <= 4) {
			ISOweekStart.setDate(simpleDate.getDate() - simpleDate.getDay() + 1);
	}
	else {
			ISOweekStart.setDate(simpleDate.getDate() + 8 - simpleDate.getDay());
	}

	return ISOweekStart;
}
