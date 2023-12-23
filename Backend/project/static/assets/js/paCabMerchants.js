$(document).ready(function () {
  var $dateCab1 = $("#dateCab1");
  var $dateCab2 = $("#dateCab2");
  var $select1 = $("#select1");
  var $select2 = $("#select2");
  var $submit1 = $("#submit1");
  var $test1 = $("#test1");
  var csrf_token = document.getElementById("csrf").value;

  $dateCab2.on("input", function (e) {
    var xhttp = new XMLHttpRequest();
    let date = String($dateCab1.val()) + "&" + String($dateCab2.val());
    xhttp.open("POST", "/paCabMerchants/getCabMerchants/" + date, true);
    xhttp.setRequestHeader("X-CSRFToken", csrf_token);
    xhttp.send();
    xhttp.onload = function () {
      var jsonResponse = JSON.parse(xhttp.responseText);
      var count = Object.keys(jsonResponse).length;
      for (let i = 0; i < count; i++) {
        var tag = document.createElement("option");
        var text = document.createTextNode(jsonResponse[i]);
        tag.appendChild(text);
        // var att = document.createAttribute('value')
        // att.value = jsonResponse[i]
        tag.setAttribute("value", jsonResponse[i]);
        var element = document.getElementById("select1");
        element.appendChild(tag);
      }
      $submit1.html("Select Merchant");
    };
  });
  $select1.on("input", function (e) {
    $submit1.html("Get Data");
  });

  $select1.on("input", function (e) {
    var xhttp = new XMLHttpRequest();
    let date = String($dateCab1.val()) + "&" + String($dateCab2.val()) + "&" + String($select1.val());
    xhttp.open("POST", "/paCabMerchants/getCabSubMerchants/" + date, true);
    xhttp.setRequestHeader("X-CSRFToken", csrf_token);
    xhttp.send();
    xhttp.onload = function () {
      var jsonResponse = JSON.parse(xhttp.responseText);
      var count = Object.keys(jsonResponse).length;
      for (let i = 0; i < count; i++) {
        var tag = document.createElement("option");
        var text = document.createTextNode(jsonResponse[i]);
        tag.appendChild(text);
        // var att = document.createAttribute('value')
        // att.value = jsonResponse[i]
        tag.setAttribute("value", jsonResponse[i]);
        var element = document.getElementById("select2");
        element.appendChild(tag);
      }
      $submit1.html("Get Data");
    };
  });
  $select2.on("input", function (e) {
    $submit1.html("Get Data");
  });
});
