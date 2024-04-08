// 체크박스
document.getElementById('perm').addEventListener('click', checkAll);
document.getElementById('perm0').addEventListener('click', checkMaster);

function checkAll(){
  const checkBoxes = document.querySelectorAll("[name=perm]");
  const checked = document.querySelectorAll("[name=perm]:checked");
  const master = document.querySelector("[name=master]");

  if(checkBoxes.length == checked.length) {
    master.checked = true;
  } else {
    master.checked = false;
  }
}

function checkMaster(){
  const checkBoxes = document.getElementsByName('perm');
  const master = document.querySelector("[name=master]");

  checkBoxes.forEach((checkbox) => {
    checkbox.checked = master.checked;
  })
}

// 등록버튼
document.getElementById('saveBtn').addEventListener('click', saveUsers);

async function saveUsers() {
  if(!formValidation()) {
    return;
  }
  
  let formData = new FormData(document.insertForm);
  
  const permList = document.querySelectorAll("[name=perm]:checked");
  // const list = [];
  // for(i = 0; i < permList.length; i++) {
  //   list.push(permList[i].value);
  // }

  // formData.append("perm", list.join(","))
  for (let data of formData) {
    console.log(data[0]+ ', ' + data[1]);
  }
  // console.log(list.join(","));

	await fetch('/ajax/insertusers',{
		method : 'POST',
    headers: formDataHeaders,
		body : formData
	})
	.then(res => res.json())
	.then(res => {
    console.log(res);
    result = res;
    location.href = '/userslist';
  })
  

	if(result){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "사용자 등록 완료!",
			// text: "사용자 등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 2000
		});
    // window.open("usersList.html");
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "사용자 등록 실패",
			// text: "사용자 등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 2000
		});
	}
};


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