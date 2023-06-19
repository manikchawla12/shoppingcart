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
      `</td><td><img src="` +
      parsedData[i].image +
      `"></img></td><td>
      <button class="btn btn-success">Edit</button>
      </td><td><button class="btn btn-danger">Delete </button>
      </td></tr>`;
  }

  document.getElementById("bodytable").innerHTML = table;
  $("#myTable").DataTable();
}

//validating the add form

$(".myadd").click(() => {
  $("#name").val("");
  $("#price").val("");
  $("#image").val("");

  $("#myform").validate({
    rules: {
      username: {
        required: true,
        minlength: 3,
      },
      price: {
        required: true,
        minlength: 2,
      },
      image: "required",
    },
    messages: {
      username: {
        required: "Please enter the value",
        minlength: "Enter valid name",
      },
      price: {
        required: "Please enter the value",
        minlength: "Enter valid price",
      },
      image: "Please upload photo",
    },
  });
});

//function to add item

$("#submit").click((e) => {
  // debugger;
  if ($("#myform").valid()) {
    e.preventDefault();
    let obj = {};
    let parsedData = JSON.parse(localStorage.getItem("data"));

    let getAllId = parsedData.map((newValue) => {
      return newValue.id;
    });

    let maxId = Math.max(...getAllId);
    newId = maxId + 1;

    let newName = $("#name").val();
    let newPrice = $("#price").val();
    let newImage = document.getElementById("img1").src;

    obj.id = newId;
    obj.name = newName;
    obj.price = newPrice;
    obj.image = newImage;
    obj.isdeleted = false;
    console.log(obj);

    parsedData.push(obj);
    let addData = JSON.stringify(parsedData);
    localStorage.clear();
    localStorage.setItem("data", addData);
    showData();
    $(".modal").modal("hide");
  }
});

//render image

function render(img1) {
  console.log(img1.files);
  if (img1.files && img1.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#img1").attr("src", e.target.result);
    };
    reader.readAsDataURL(img1.files[0]);
  }
}
