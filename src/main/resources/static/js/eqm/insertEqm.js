// 등록버튼
document.getElementById('saveBtn').addEventListener('click', saveEqm);

async function saveEqm() {
  if(!formValidation()) {
      return;
    }

  let formData = new FormData(document.insertForm);
  
	await fetch('/ajax/inserteqm',{
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
      location.href = '/eqmlist';
    }, 1000);
  })

  
  // SweetAlert
	if(result > 0){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "설비 기기 등록 완료!",
			// text: "설비 기기 등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 2000
		});
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "설비 기기 등록 실패",
			// text: "설비 기기 등록이 정상적으로 처리되지 않았습니다.",
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
  const notice6 = document.getElementById('notice6');

  let result = true;

  if(insertForm.eqmName.value == null || insertForm.eqmName.value == '') {
    notice1.innerText = '설비명을 입력하세요.';
    result = false;
  }

  if(insertForm.modelName.value == null || insertForm.modelName.value == '') {
    notice2.innerText = '모델명을 입력하세요.';
    result = false;
  }

  if(insertForm.installPlace.value == null || insertForm.installPlace.value == '') {
    notice3.innerText = '설치장소를 입력하세요.';
    result = false;
  }

  if(insertForm.buyDate.value == null || insertForm.buyDate.value == '') {
    notice4.innerText = '구입일자를 선택하세요.';
    result = false;
  }

  if(insertForm.eqmStatus.value == null || insertForm.eqmStatus.value == '') {
    notice5.innerText = '설비상태를 선택하세요.';
    result = false;
  }

  if(insertForm.oprStatus.value == null || insertForm.oprStatus.value == '') {
    notice6.innerText = '가동현황을 선택하세요.';
    result = false;
  }

  return result;
}

$(function() {
  $('.req').on('change', function(){if(this.value != "") $(this).next().html("")})
  $('[name="eqmStatus"]').on('change', function(){if($('[name="eqmStatus"]:checked').length == 1) $("#notice5").html("")})
  $('[name="oprStatus"]').on('change', function(){if($('[name="oprStatus"]:checked').length == 1) $("#notice6").html("")})
})


// 설비상태 - 가동현황 연동
insertForm.eqmStatus[0].addEventListener('change', changeOption1);
insertForm.eqmStatus[1].addEventListener('change', changeOption1);
insertForm.eqmStatus[2].addEventListener('change', changeOption1);
insertForm.eqmStatus[3].addEventListener('change', changeOption1);
insertForm.eqmStatus[4].addEventListener('change', changeOption1);

function changeOption1() {
  const option = window.event.target.value;
  if(option != 'ES1')
  insertForm.oprStatus.value = 'FO3';
}

insertForm.oprStatus[0].addEventListener('change', changeOption2);
insertForm.oprStatus[1].addEventListener('change', changeOption2);
insertForm.oprStatus[2].addEventListener('change', changeOption2);

function changeOption2() {
  const option = window.event.target.value;
  if(option != 'F03') {
    insertForm.eqmStatus.value = 'ES1';
  }
}


// 정보수정 버튼
async function updateEqm() {
  if(!formValidation()) {
      return;
    }

  let formData = new FormData(document.insertForm);
  
	await fetch('/ajax/updateeqm',{
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
      location.href = '/eqmlist';
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
async function deleteEqm() {
  let eqmCode = insertForm.eqmCode.value

  window.setTimeout(function() {
    location.href = '/deleteeqm/' + eqmCode
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