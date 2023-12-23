// Handle department activity
$("#rev_category").on("change", function () {
  var rev_category = this.value;
  var cash_category = document.getElementById("cash_category").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var region = document.getElementById("region").value;
  var csrf_token = document.getElementById("csrf").value;


  if (cash_category != "" && month != "" && region != "") {
    $.ajax({
      data: {
        rev_category: rev_category,
        month: month,
        cash_category: cash_category,
        region: region,
        year: year,
      },
      type: "POST",
      url: "fetchRevenueAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";
      document.getElementById("amount").value = data["revData"][0][0];
    });
  }
});

$("#cash_category").on("change", function () {
  var cash_category = this.value;
  var rev_category = document.getElementById("rev_category").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var region = document.getElementById("region").value;
  var csrf_token = document.getElementById("csrf").value;

  if (rev_category != "" && month != "" && region != "") {
    $.ajax({
      data: {
        rev_category: rev_category,
        month: month,
        cash_category: cash_category,
        region: region,
        year: year,
      },
      type: "POST",
      url: "fetchRevenueAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";
      document.getElementById("amount").value = data["revData"][0][0];
    });
  }
});

$("#month").on("change", function () {
  var month = this.value;
  var year = document.getElementById("year").value;
  var rev_category = document.getElementById("rev_category").value;
  var cash_category = document.getElementById("cash_category").value;
  var region = document.getElementById("region").value;
  var csrf_token = document.getElementById("csrf").value;

  if (rev_category != "" && cash_category != "" && region != "") {
    $.ajax({
      data: {
        rev_category: rev_category,
        month: month,
        cash_category: cash_category,
        region: region,
        year: year,
      },
      type: "POST",
      url: "fetchRevenueAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";
      document.getElementById("amount").value = data["revData"][0][0];
    });
  }
});

$("#region").on("change", function () {
  var region = this.value;
  var rev_category = document.getElementById("rev_category").value;
  var cash_category = document.getElementById("cash_category").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var csrf_token = document.getElementById("csrf").value;

  if (rev_category != "" && cash_category != "" && month != "") {
    $.ajax({
      data: {
        rev_category: rev_category,
        month: month,
        cash_category: cash_category,
        region: region,
        year: year,
      },
      type: "POST",
      url: "fetchRevenueAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";
      document.getElementById("amount").value = data["revData"][0][0];
    });
  }
});
