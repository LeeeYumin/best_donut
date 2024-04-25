// 그리드 행 호버
tui.Grid.applyTheme('default', {
	row:{
			hover:{
					background:'#ccc'
			}
	}
})

function sample4_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ''; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
          extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if(data.buildingName !== '' && data.apartment === 'Y'){
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if(extraRoadAddr !== ''){
          extraRoadAddr = ' (' + extraRoadAddr + ')';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample4_postcode').value = data.zonecode;
      document.getElementById("sample4_roadAddress").value = roadAddr;
      document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
      
      // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
      if(roadAddr !== ''){
          document.getElementById("sample4_extraAddress").value = extraRoadAddr;
      } else {
          document.getElementById("sample4_extraAddress").value = '';
      }

      var guideTextBox = document.getElementById("guide");
      // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
      if(data.autoRoadAddress) {
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
          guideTextBox.style.display = 'block';

      } else if(data.autoJibunAddress) {
          var expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
          guideTextBox.style.display = 'block';
      } else {
          guideTextBox.innerHTML = '';
          guideTextBox.style.display = 'none';
      }
    }
  }).open();
}

async function saveInsert() {

  let companyName = insertForm.companyName.value;
  let companySep = insertForm.companySep.value;
  let ownerName =insertForm.ownerName.value;
  let tel = insertForm.tel.value;
  let addr = insertForm.addr.value;
  let addrDetail = insertForm.addrDetail.value;
  let postcode = insertForm.postcode.value;

  let param = {companyName, companySep, ownerName, tel, addr, addrDetail, postcode};

  console.log(param);
  let data = {
    method: 'POST',
		headers: jsonHeaders,
		body : JSON.stringify(param)
  };

  let result = await fetch('ajax/insertCompany', data);
  let res = await result.json();

  console.log(res);
  if(res){
    Swal.fire({
			position: "center",
			icon: "success",
			title: "거래처 등록 완료!",
			text: "거래처 등록이 정상적으로 처리되었습니다.",
			showConfirmButton: false,
			timer: 1500
		});
		resetInsert();
	}
	else {
		Swal.fire({
			position: "center",
			icon: "error",
			title: "거래처 등록 실패",
			text: "거래처 등록이 정상적으로 처리되지 않았습니다.",
			showConfirmButton: false,
			timer: 1500
		});
  }
}

function resetInsert() {
  insertForm.reset();
}