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
  const list = [];
  for(i = 0; i < permList.length; i++) {
    list.push(permList[i].value);
  }

  formData.append("perm", list.join(","))
  for (let data of formData) {
    console.log(data[0]+ ', ' + data[1]); 
  }
  console.log(list.join(","));

	await fetch('/ajax/insertusers',{
		method : 'POST',
    headers: formDataHeaders,
		body : formData
	})
	.then(res => res.json())
	.then(res => {
    console.log(res);
  })
  
  alert('등록완료!');
};

function formValidation() {
  if(insertForm.usersCode.value == null || insertForm.usersCode.value == '') {
    return false;
  }

  if(insertForm.usersName.value == null || insertForm.usersName.value == '') {
    return false;
  }

  if(insertForm.position.value == null || insertForm.position.value == '') {
    return false;
  }

  if(insertForm.perm.value == null || insertForm.perm.value == '') {
    return false;
  }

  if(insertForm.status.value == null || insertForm.status.value == '') {
    return false;
  }

  return true;
}