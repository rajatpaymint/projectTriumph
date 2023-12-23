$(document).ready(function () {
  var $emailInput = $("#email");
  var $loadMessage = $("#loading");
  var $password = $("#password");
  var csrf_token = document.getElementById("csrf").value;
  $emailInput.on("input", function (e) {
    $loadMessage.hide();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/email_check/" + $emailInput.val(), true);
    xhttp.setRequestHeader("X-CSRFToken", csrf_token);
    xhttp.send();
    xhttp.onload = function () {
      var jsonResponse = JSON.parse(xhttp.responseText);
      if (jsonResponse["match"] == "true") {
        $loadMessage.removeClass("text-c-red");
        $loadMessage.addClass("text-c-green");
        $loadMessage.show();
        $loadMessage.html("Woohoo, email-id is correct!");
      } else {
        $loadMessage.removeClass("text-c-green");
        $loadMessage.addClass("text-c-red");
        $loadMessage.show();
        $loadMessage.html("No user with this email found!");
      }
    };
    //var JSONresponse = JSON.parse(xhttp.responseText)
  });
});
