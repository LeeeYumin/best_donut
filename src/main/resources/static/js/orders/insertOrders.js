async function saveInsert() {
	let formData = new FormData(document.frm);

  for (let data of formData) {
      console.log(data[0]+ ', ' + data[1]); 
  }

	await fetch('ajax/insertOrders',{
		method : 'post',
    headers: formDataHeaders,
		body : formData
	})
	.then(res => res.json())
	.then(res => {
    console.log(res);
  })
  
}

// async function saveInsert() {

//  const ordersCode = frm.ordersCode.value;
// 	const ordersDate = frm.ordersDate.value;
// 	const dueDate = frm.dueDate.value;
// 	const totalOrdersPrice = frm.totalOrdersPrice.value;
// 	const companyCode = frm.companyCode.value;

// 	let param = {ordersCode, ordersDate, dueDate, totalOrdersPrice, companyCode}
//   console.log(param);
	
// 	// 1. fetch 방식
//   await fetch('ajax/insertOrders',{
// 		method : 'post',
//     headers: jsonHeaders,
// 		body : JSON.stringify(param)
// 	})
// 	.then(res => res.json())
// 	.then(res => {
//     console.log(res);
//   })
// }
