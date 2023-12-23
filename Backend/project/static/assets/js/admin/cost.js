// Handle department activity
$("#cost_s").on("change", function () {
  var cost_s = this.value;
  var cash_category = document.getElementById("cash_category").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var region = document.getElementById("region").value;
  var csrf_token = document.getElementById("csrf").value;
  if (cash_category != "" && month != "" && region !== "") {
    $.ajax({
      data: {
        cost_s: cost_s,
        month: month,
        cash_category: cash_category,
        region: region,
        year: year,
      },
      type: "POST",
      url: "fetchCostAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";

      document.getElementById("amount").value = data["costData"][0][0];
      // document.getElementById("region").value = data['costData'][0][1];
    });
  }
});

$("#cash_category").on("change", function () {
  var cash_category = this.value;
  var cost_s = document.getElementById("cost_s").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var region = document.getElementById("region").value;
  var csrf_token = document.getElementById("csrf").value;

  if (cost_s != "" && month != "" && region != "") {
    $.ajax({
      data: {
        cost_s: cost_s,
        month: month,
        year: year,
        cash_category: cash_category,
        region: region,
      },
      type: "POST",
      url: "fetchCostAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";

      document.getElementById("amount").value = data["costData"][0][0];
    });
  }
});

$("#month").on("change", function () {
  var month = this.value;
  var year = document.getElementById("year").value;
  var cost_s = document.getElementById("cost_s").value;
  var cash_category = document.getElementById("cash_category").value;
  var region = document.getElementById("region").value;
  var csrf_token = document.getElementById("csrf").value;

  if (cost_s != "" && cash_category != "" && region != "") {
    $.ajax({
      data: {
        cost_s: cost_s,
        month: month,
        cash_category: cash_category,
        region: region,
        year: year,
      },
      type: "POST",
      url: "fetchCostAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";

      document.getElementById("amount").value = data["costData"][0][0];
    });
  }
});

$("#region").on("change", function () {
  var region = this.value;
  var cost_s = document.getElementById("cost_s").value;
  var cash_category = document.getElementById("cash_category").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("year").value;
  var csrf_token = document.getElementById("csrf").value;

  if (cost_s != "" && cash_category != "" && month != "") {
    $.ajax({
      data: {
        cost_s: cost_s,
        month: month,
        cash_category: cash_category,
        region: region,
        year: year,
      },
      type: "POST",
      url: "fetchCostAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("amount").value = "";

      document.getElementById("amount").value = data["costData"][0][0];
    });
  }
});

//   // Handle month activity
//   $('#month').on('change', function () {
//     var month = this.value;
//     var dep = document.getElementById("department").value;
//     var heighlights = [document.getElementById("hpoint1").value, document.getElementById("hpoint2").value, document.getElementById("hpoint3").value, document.getElementById("hpoint4").value, document.getElementById("hpoint5").value];
//     if (dep != "") {
//       $.ajax({
//         data: {
//           month: month,
//           department: dep,
//         },
//         type: "POST",
//         url: "depDataApi",
//       }).done(function (data) {
//         document.getElementById("hpoint1").value = "";
//         document.getElementById("hpoint2").value = "";
//         document.getElementById("hpoint3").value = "";
//         document.getElementById("hpoint4").value = "";
//         document.getElementById("hpoint5").value = "";

//         for (var i in data['userWiseData']) {
//           element = "hpoint" + (parseInt(i) + 1);
//           document.getElementById(element).value = data['userWiseData'][i];
//           // element.innerHTML = data['userWiseData'][i];
//         }

//       });

//     }
//   });

//   // Monthly Dyanimic Summary
//   function depMonthlyAPI(data,liName) {
//     // alert(name+" "+job);
//     var id_maker = liName + 'sub';
//     var id_ul = liName + 'subul';

//     $.ajax({
//       data: {
//         month_detail: data,
//       },
//       type: "POST",
//       url: "depDataApi",
//     }).done(function (data) {
//       if (data["status"] == 200) {

//         $("#" + id_maker).empty();
//         $("#" + id_ul).empty();
//         for (var i in data['userWiseData']) {
//           let lastElement = data['userWiseData'][i][
//             [(data['userWiseData'][i]).length - 1]
//           ];
//           // var ulel = document.createElement("ul");
//           // ulel.innerHTML = lastElement;
//           // $("#"+id_ul).append(ulel);

//           // array contains username and department name which we don't need while displaying
//           len_data = data['userWiseData'][i].length;
//           data['userWiseData'][i] = data['userWiseData'][i].slice(0, len_data - 2);
//           for (var j in data['userWiseData'][i]) {

//             var element = document.createElement("li");
//             element.innerHTML = data['userWiseData'][i][j];
//             $("#" + id_maker).append(element);
//           }
//         }
//       }
//     });

//   }
