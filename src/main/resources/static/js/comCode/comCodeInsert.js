// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

// 주코드 목록 가져오기
function getComCodeSelect() {
  let param = {};
  const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

  fetch('ajax/getComCodeList', data)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    for(com of res){
			let optionHtml = `<option value="${com.maincode}">${com.maincode} (${com.maincodeName})</option>`
			let maincodeSelect = document.querySelector("#maincodeSelect")
			maincodeSelect.insertAdjacentHTML('beforeend', optionHtml);
		}
  })
}
getComCodeSelect();

// 주코드 등록
async function insertComCode() {
  let maincode = document.querySelector('#maincode').value;
  let maincodeName = document.querySelector('#maincodeName').value;
  let param = {maincode, maincodeName};

  let check = await valComCode(maincode, maincodeName);

  if(!check){
    console.log('return');
    return;
  }
  console.log('continue');

  const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	let res = await fetch('ajax/insertComCode', data);
	let result = await res.json();
  console.log(result);
  
  if(result){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "공통코드 등록 완료!",
			text: "공통코드 등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
		codeReset();
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "공통코드 등록 실패",
			text: "공통코드 등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}
}

// 주코드 검사
async function valComCode(maincode, maincodeName) {

  let valid = document.querySelector('#defaultFormControlHelp1');

  if(maincode == null || maincode == ''){
    valid.innerHTML = '주코드를 입력해주세요.';
    return false;
  }

  if(maincodeName == null || maincodeName == ''){
    valid.innerHTML = '주코드 설명을 입력해주세요.';
    return false;
  }

	let res = await fetch(`ajax/valComCode?maincode=${maincode}`)
  let result = await res.json();
  if(!result){
    valid.innerHTML = '중복된 주코드입니다.';
    return false;
  };

  return true;
}

// 부코드 등록
async function insertComCodeDet() {
  let maincode = document.querySelector('#maincodeSelect').value;
  let subcode = document.querySelector('#subcode').value;
  let subcodeName = document.querySelector('#subcodeName').value;
  let param = {maincode, subcode, subcodeName};

  let check = await valComCodeDet(maincode, subcode, subcodeName);

  if(!check){
    console.log('return');
    return;
  }
  console.log('continue');

  const data = {
		method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
	};

	let res = await fetch('ajax/insertComCodeDet', data);
	let result = await res.json();
  console.log(result);
  
  if(result){
		Swal.fire({
			position: "center",
			icon: "success",
			title: "공통코드 등록 완료!",
			text: "공통코드 등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
		detReset();
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "공통코드 등록 실패",
			text: "공통코드 등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 1500
		});
	}
}

// qn코드 검사
async function valComCodeDet(maincode, subcode, subcodeName) {

  let valid = document.querySelector('#defaultFormControlHelp2');

  if(maincode == null || maincode == ''){
    valid.innerHTML = '주코드를 입력해주세요.';
    return false;
  }

  if(subcode == null || subcode == ''){
    valid.innerHTML = '부코드를 입력해주세요.';
    return false;
  }

  if(subcodeName == null || subcodeName == ''){
    valid.innerHTML = '부코드 설명을 입력해주세요.';
    return false;
  }

	let res = await fetch(`ajax/valComCodeDet?subcode=${subcode}`)
  let result = await res.json();
  if(!result){
    valid.innerHTML = '중복된 부코드입니다.';
    return false;
  };

  return true;
}

// 주코드 검색 초기화
function codeReset() {
  codeSearchForm.reset();
  document.querySelector('#defaultFormControlHelp1').innerHTML = '';
}

// 부코드 검색 초기화
function detReset() {
  detSearchForm.reset();
  document.querySelector('#defaultFormControlHelp2').innerHTML = '';
}
