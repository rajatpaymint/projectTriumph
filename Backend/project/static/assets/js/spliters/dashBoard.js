// PMX Split
// $(document).ready(function () {
//   $submitButton = $("#process_CCVolume");
//   $submitButton.click(function (event) {
//     document.getElementById("process_CCVolume").style.visibility = "hidden";
//     $.ajax({
//       data: {
//         date1: date1,
//         date2: date2,
//       },
//       type: "POST",
//       url: "ccVolume",
//     }).done(function (data) {
//       if (data["status"] == 200) {
//         $("#ccVolume")
//           .text("CC PV: INR " + parseInt(data["CCVolume"]).toLocaleString("en-IN"))
//           .show();
//       } else {
//       }
//     });

//     //   console.clear()
//     event.preventDefault();
//   });
// });

$(function () {
  $("#loadingI").hide();
  var date1 = document.getElementById("entered_date1").value;
  var date2 = document.getElementById("entered_date2").value;
  var csrf_token = document.getElementById("csrf").value;
  var $submitButton = $("#process_CCVolume");
  $submitButton.on("click", function (e) {
    $("#loadingI").show();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/ccVolume", true);
    var data = JSON.stringify({ date1: date1, date2: date2 });
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("X-CSRFToken", csrf_token);
    xhttp.send(data);
    xhttp.onload = function () {
      var jsonResponse = JSON.parse(xhttp.responseText);
      let currency = jsonResponse["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(jsonResponse["usdToINR"]);
      }
      $("#ccVolume")
        .text("CC PV: INR " + parseInt(jsonResponse["ccVolume"] / iu).toLocaleString("en-IN"))
        .show();
      $("#loadingI").hide();
    };
  });
});
