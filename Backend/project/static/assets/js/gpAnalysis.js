$(document).ready(function () {
  var csrf_token = document.getElementById("csrf").value;
  $.ajax({
    type: "POST",
    url: "gpAnalysisDataApi",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    positive_data = data["positive_total"];

    total_volume = data["total_volume"];
    var row2 = document.getElementById("total_pv");

    for (let i = 1; i < total_volume.length + 1; i++) {
      var cell = row2.insertCell(i);
      cell.innerHTML = parseInt(total_volume[i - 1]);
    }
    var row1 = document.getElementById("positive_pv");
    for (let i = 1; i < positive_data.length + 1; i++) {
      var cell = row1.insertCell(i);
      cell.innerHTML = parseInt(positive_data[i - 1]);
    }

    negative_data = data["negative_total"];
    var row5 = document.getElementById("negative_pv");
    for (let i = 1; i < negative_data.length + 1; i++) {
      var cell = row5.insertCell(i);
      cell.innerHTML = parseInt(negative_data[i - 1]);
    }

    total_percent_margine_pv = data["total_percent_margine_pv"];
    var row3 = document.getElementById("total_margin");
    for (let i = 1; i < total_percent_margine_pv.length + 1; i++) {
      var cell = row3.insertCell(i);
      cell.innerHTML = parseInt(total_percent_margine_pv[i - 1]) + "%";
    }
    $("#loadingIcon").hide();
  });
});
