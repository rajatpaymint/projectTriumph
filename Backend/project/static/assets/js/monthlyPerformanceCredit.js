$(document).ready(function () {
  $("#loadingIcon").hide();
  var $submitButton = $("#creditData");
  var $monthlyPvHead = $("#monthlyPvHead");
  var csrf_token = document.getElementById("csrf").value;
  var toggle = 0;
  $submitButton.on("click", function (e) {
    $("#loadingIcon").show();
    if (toggle == 0) {
      toggle = 1;
      initialPv = [];
      for (let i = 0; i < 13; i++) {
        rowId = "#" + String(i + 1);
        initialPv.push($(rowId).html());
      }
      fy21Pv = [];
      for (let i = 13; i < 26; i++) {
        rowId = "#" + String(i + 1);
        fy21Pv.push($(rowId).html());
      }
      fy22Pv = [];
      for (let i = 26; i < 39; i++) {
        rowId = "#" + String(i + 1);
        fy22Pv.push($(rowId).html());
      }
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "/monthlyPerformanceCredit", true);
      var data = JSON.stringify({ date1: "Rajat" });
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.setRequestHeader("X-CSRFToken", csrf_token);
      xhttp.send(data);
      xhttp.onload = function () {
        var jsonResponse = JSON.parse(xhttp.responseText);
        for (let i = 0; i < jsonResponse["creditPv"].length; i++) {
          rowId = "#" + String(i + 1);
          var $row = $(rowId);
          $row.html(String(parseInt(jsonResponse["creditPv"][i] / 10000000).toLocaleString("en-IN")) + " (" + String(parseInt(jsonResponse["fy23PvTarget"][i]).toLocaleString("en-IN")) + ")");
        }
        for (let i = 13; i < 26; i++) {
          rowId = "#" + String(i + 1);
          var $row = $(rowId);
          $row.html(String(parseInt(jsonResponse["fy21CreditPv"][i - 13]).toLocaleString("en-IN")));
        }
        for (let i = 26; i < 39; i++) {
          rowId = "#" + String(i + 1);
          var $row = $(rowId);
          $row.html(String(parseInt(jsonResponse["fy22CreditPv"][i - 26]).toLocaleString("en-IN")));
        }
        $monthlyPvHead.html("Monthly PV (INR Cr)(Credit Card)");
        $submitButton.html("Card+EFT");
        $("#loadingIcon").hide();
      };
    } else {
      $("#loadingIcon").show();
      toggle = 0;
      for (let i = 0; i < 13; i++) {
        rowId = "#" + String(i + 1);
        var $row = $(rowId);
        $row.html(initialPv[i]);
      }
      for (let i = 13; i < 26; i++) {
        rowId = "#" + String(i + 1);
        var $row = $(rowId);
        $row.html(fy21Pv[i - 13]);
      }
      for (let i = 26; i < 39; i++) {
        rowId = "#" + String(i + 1);
        var $row = $(rowId);
        $row.html(fy22Pv[i - 26]);
      }
      $monthlyPvHead.html("Monthly PV (INR Cr)(Card+EFT)");
      $submitButton.html("Credit Card");
      $("#loadingIcon").hide();
    }
  });
});
