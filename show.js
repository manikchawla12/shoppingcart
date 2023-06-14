$(document).ready(() => {
  let initialData = localStorage.getItem("data"); //key ko string meh pass krte h
  if (!initialData) {
    getData();
  } else showData();
});

//here we set data in local storage
function getData() {
  $.ajax({
    url: "./db.json",
    type: "get",
    datatype: "json",
    success: success,
    error: error,
  });

  function success(response) {
    localStorage.setItem("data", JSON.stringify(response));
  }

  function error(err) {
    console.log(err);
  }
}

//here we show data on homepage

function showData() {
  var data = localStorage.getItem("data");
  let parsedData = JSON.parse(data);
  let length = parsedData.length;
  let table = "";
  for (let i = 0; i < length; i++) {
    table +=
      `<tr><td>` +
      parsedData[i].id +
      `</td><td>` +
      parsedData[i].name +
      `</td><td>` +
      parsedData[i].price +
      `</td><td>` +
      `<img src="` +
      parsedData[i].image +
      `"></img>` +
      `</td></tr>`;
  }

  document.getElementById("bodytable").innerHTML = table;
  $("#myTable").DataTable();
}
