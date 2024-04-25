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

// week => date(yyyy-MM-dd) 변환함수
function getDateFromWeek(week) {

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

// date => week(yyyy-w01) 변환함수
function getWeekFromDate(dt)
{
    dt.setHours(0,0,0,0);
    dt.setDate(dt.getDate() + 3 - (dt.getDay() + 6) % 7);
    const week1 = new Date(dt.getFullYear(), 0, 4);
    const weekNumber = 1 + Math.round(((dt.getTime() - week1.getTime())/ 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);

    return `${dt.getFullYear()}-W${weekNumber}`;
}

//오늘날짜
function today(){
  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month  + '-' + day;

  return dateString;
}

function addDate(y,m,d){
	const newDate = new Date();
	newDate.setFullYear(newDate.getFullYear() + y);
	newDate.setMonth(newDate.getMonth() + m);
	newDate.setDate(newDate.getDate() + d);
	return dateFormat(newDate);

}
