// 날짜 포맷 함수('yyyy/MM/dd')
function dateFormat(date) {

	if(date == null){
		return '';
	}

	let dateForm = new Date(date.value);
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

