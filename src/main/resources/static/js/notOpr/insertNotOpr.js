// 등록버튼
document.getElementById('saveBtn').addEventListener('click', saveNotOpr);

async function saveNotOpr() {
  // if(!formValidation()) {
  //   return;
  // }
  
  let formData = new FormData(document.insertForm);
  
	await fetch('/ajax/insertnotopr',{
		method : 'POST',
    headers: formDataHeaders,
		body : formData
	})
	.then(res => res.json())
	.then(res => {
    console.log(res);
    result = res;
  })
  // .then(res => {
  //   window.setTimeout(function() {
  //     location.href = '/notoprlist';
  //   }, 1000);
  // })
  

  // SweetAlert
	if(result){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "비가동 등록 완료!",
			// text: "비가동 등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 2000
		});
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "비가동 등록 실패",
			// text: "비가동 등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 2000
		});
	}
};


// 유효성검사
function formValidation() {
  const notice1 = document.getElementById('notice1');
  const notice2 = document.getElementById('notice2');
  const notice3 = document.getElementById('notice3');
  const notice4 = document.getElementById('notice4');

  if(insertForm.usersName.value == null || insertForm.usersName.value == '') {
    notice1.innerText = '사용자명을 입력하세요.';
    return false;
  }

  if(insertForm.position.value == null || insertForm.position.value == '') {
    notice2.innerText = '소속을 입력하세요.';
    return false;
  }

  const permList = document.querySelectorAll("[name=perm]:checked");
  if(permList == null || permList.length == 0) {
    notice3.innerText = '사용자권한을 선택하세요.';
    return false;
  }

  if(insertForm.usersStatus.value == null || insertForm.usersStatus.value == '') {
    notice4.innerText = '사용자상태를 선택하세요.';
    return false;
  }

  return true;
}