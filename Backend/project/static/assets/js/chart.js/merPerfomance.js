$(document).ready(function () {
  $submitButton = $("#get_perfomance");
  var csrf_token = document.getElementById("csrf").value;
  $submitButton.click(function (event) {
    var select1 = document.getElementById("select").value;
    $.ajax({
      data: {
        select: select1,
      },
      type: "POST",
      url: "merperfomanceAPI",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      if (data["status"] == 200) {
        // Let's Plot Year Data
        var yeardata = [
          {
            x: data["one_year"]["Month"],
            y: data["one_year"]["Amount"],
            type: "bar",
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
              text: "Month",
            },
          },
        };
        Plotly.newPlot("chart", yeardata, layout);

        $("#vname1").text(data["vendorName"]).show();
        $("#header1").text("Last 12 Months Transaction").show();

        $("#vname2").text(data["vendorName"]).show();
        $("#header2").text("Last 4 Quarter Data").show();
        // Let's plot Quarter Data

        var quarterdata = [
          {
            x: data["graphJSON1"]["Quarter"],
            y: data["graphJSON1"]["Amount"],
            type: "bar",
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
              text: "Quarter",
            },
          },
        };

        Plotly.newPlot("chart1", quarterdata, layout);
      }
    });

    //   console.clear()
    event.preventDefault();
  });
});
