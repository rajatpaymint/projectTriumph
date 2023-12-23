// Pass the type from HTML to fetch the particular data
function getMonthData() {
  $("#loadingText").text("Loading....").show();

  btype = document.getElementById("bussinessType").value;
  date1 = document.getElementById("date1").value;
  date2 = document.getElementById("date2").value;
  var csrf_token = document.getElementById("csrf").value;

  if (btype != "" && date1 != "" && date2 != "") {
    $.ajax({
      data: {
        date1: date1,
        date2: date2,
        bussinessType: btype,
      },
      type: "POST",
      url: "dailyTrend",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      document.getElementById("graphDiv").style.display = "inline";
      bType = document.getElementById("bType");
      bType.innerHTML = data["btype"].toUpperCase();

      mainBody = document.getElementById("tbody");
      // Clear only row's from table
      mainBody.innerHTML = "";

      data["data"].forEach((todo) => {
        let newRow = document.createElement("tr");
        Object.values(todo).forEach((value) => {
          let cell = document.createElement("td");
          cell.innerText = value;
          newRow.appendChild(cell);
        });
        mainBody.appendChild(newRow);
      });

      // Initializing DATATABLE for Sorting and searching and pagination
      $(document).ready(function () {
        $("#table1").DataTable();
      });

      // Graph

      var monthly = [
        {
          x: data["date"],
          y: data["amount"],
          type: "line",
        },
      ];
      var layout = {
        yaxis: {
          ticklabelposition: "inside top",
          tickformat: ".2f",
          title: {
            text: "Amount (INR Cr)",
          },
        },
        xaxis: {
          title: {
            text: "Date",
          },
        },
      };
      Plotly.newPlot("chart", monthly, layout);

      $("#fromDate")
        .text("From : " + data["fromDate"].toUpperCase())
        .show();
      $("#toDate")
        .text("To : " + data["toDate"].toUpperCase())
        .show();
      $("#header1")
        .text(data["btype"] + " Trend")
        .show();
      $("#loadingText").text("").show();

      // $("#vname2").text(data['vendorName']).show();
      // $("#header2").text("Last 4 Quarter Data").show();
    });
  }
}
