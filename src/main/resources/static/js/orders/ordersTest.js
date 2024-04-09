function getCompany() {
  fetch('ajax/getCompany')
  .then(res => res.json())
  .then(res => {
    console.log(res);
  })
}
getCompany();