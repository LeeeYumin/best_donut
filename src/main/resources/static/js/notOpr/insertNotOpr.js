// 등록버튼
document.getElementById('saveBtn').addEventListener('click', saveNotOpr);

async function saveNotOpr() {
  if(!formValidation()) {
      return;
    }

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
  .then(res => {
    window.setTimeout(function() {
      location.href = '/notoprlist';
    }, 1000);
  })

  
  // SweetAlert
	if(result > 0){
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
  const notice5 = document.getElementById('notice5');

  let result = true;

  if(insertForm.usersCode.value == null || insertForm.usersCode.value == '') {
    notice1.innerText = '담당자를 선택하세요.';
    result = false;
  }

  if(insertForm.eqmCode.value == null || insertForm.eqmCode.value == '') {
    notice2.innerText = '설비를 선택하세요.';
    result = false;
  }

  const list = document.querySelectorAll("[name=notOprSep]:checked");
  if(list == null || list.length == 0) {
    notice3.innerText = '비가동구분을 선택하세요.';
    result = false;
  }

  if(insertForm.beginDate.value == null || insertForm.beginDate.value == '') {
    notice4.innerText = '시작일자를 선택하세요.';
    result = false;
  }

  if(insertForm.contentsContents.value == null || insertForm.contentsContents.value == '') {
    notice5.innerText = '작업내용을 작성하세요.';
    result = false;
  }

  return result;
}

$(function() {
  $('.req').on('change', function(){if(this.value != "") $(this).next().html("")})
  $('[name="notOprSep"]').on('change', function(){if($('[name="notOprSep"]:checked').length == 1) $("#notice3").html("")})
})


// 담당자코드 - 담당자명 연동
insertForm.usersCode.addEventListener('change', changeOption1);

function changeOption1() {
  insertForm.usersName.value = insertForm.usersCode.value;
  console.log(insertForm.usersName.value);
  notice1.innerText = '';
}

insertForm.usersName.addEventListener('change', changeOption2);

function changeOption2() {
  insertForm.usersCode.value = insertForm.usersName.value;
  console.log(insertForm.usersName.value);
}


// 설비코드 - 설비명 연동
insertForm.eqmCode.addEventListener('change', changeOption3);

function changeOption3() {
  insertForm.eqmName.value = insertForm.eqmCode.value;
  console.log(insertForm.eqmName.value);
  notice2.innerText = '';
}

insertForm.eqmName.addEventListener('change', changeOption4);

function changeOption4() {
  insertForm.eqmCode.value = insertForm.eqmName.value;
  console.log(insertForm.eqmName.value);
}


// 정보수정 버튼
async function updateNotOpr() {
  if(!formValidation()) {
    return;
  }
  
  let formData = new FormData(document.insertForm);

  for (let data of formData) {
    console.log(data[0]+ ', ' + data[1]);
  }
  
	await fetch('/ajax/updatenotopr',{
		method : 'POST',
    headers: formDataHeaders,
		body : formData
	})
	.then(res => res.json())
	.then(res => {
    console.log(res);
    result = res;
  })
  .then(res => {
    window.setTimeout(function() {
      location.href = '/notoprlist';
    }, 1000);
  })
  

  // SweetAlert
	if(result > 0){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "정보수정 완료!",
			// text: "정보수정이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 2000
		});
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "정보수정 실패",
			// text: "정보수정이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 2000
		});
	}
};


// 삭제 버튼
async function deleteNotOpr() {
  let notOprCode = insertForm.notOprCode.value

  window.setTimeout(function() {
    location.href = '/deletenotopr/' + notOprCode
  }, 1000);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "삭제 완료!",
    // text: "삭제가 정상적으로 처리되었습니다.",
    showConfirmButton: false,
    timer: 2000
  });
};