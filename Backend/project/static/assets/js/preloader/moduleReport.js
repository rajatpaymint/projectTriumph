// Broad merchant API's calling

var date1 = document.getElementById("entered_date1").value;
var date2 = document.getElementById("entered_date2").value;
var csrf_token = document.getElementById("csrf").value;


function moduleReport() {

// PMX Split
$(document).ready(function () {

  //   vendor Data
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "vendorCredit",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#pmxPMCreditCount").text(data["pmxCreditData"][0].toLocaleString("en-IN")).show();
      $("#pmxPMCreditVolume").text(parseInt(data["pmxCreditData"][1] / iu).toLocaleString("en-IN")).show();
      $("#pmxBusinessCount").text(data["pmxCreditData"][6].toLocaleString("en-IN")).show();
      $("#pmxActiveCount").text(data["pmxCreditData"][5].toLocaleString("en-IN")).show();

      $("#loadingIcon").hide();
    } else {
    }
  });

  //   utilityBill Data
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "uBillCredit",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#uPMCreditCount").text(data["pmxCreditData"][0].toLocaleString("en-IN")).show();
      $("#uPMCreditVolume")
        .text(parseInt(data["pmxCreditData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#uActiveCount").text(data["pmxCreditData"][5].toLocaleString("en-IN")).show();
      $("#uBusinessCount").text(data["pmxCreditData"][6].toLocaleString("en-IN")).show();

    } else {
    }
  });

  // Invoice Discounted
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "ideDiscounted",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#idePMCount").text(data["idEData"][0].toLocaleString("en-IN")).show();
      $("#idePMVolume")
        .text(parseInt(data["idEData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#idmActiveCount").text(data["idEData"][4].toLocaleString("en-IN")).show();
      $("#idmBusinessCount").text(data["idEData"][5].toLocaleString("en-IN")).show();
    

    } else {
    }
  });


// Airlines

    $.ajax({
      data: {
        date1: date1,
        date2: date2,
        airline: "modRepAirlines",
      },
      type: "POST",
      url: "airlineSplit",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      if (data["status"] == 200) {
        let currency = data["currency"];

        if (currency == "INR") {
          var iu = 1;
        } else {
          var iu = parseInt(data["usdToINR"]);
        }
        // Set Credit split data
        $("#airlinesCreditCount").text(data["airlines_credit_Api"]["transactionCount"].toLocaleString("en-IN")).show();
        $("#airlinesCreditVolume")
          .text((data["airlines_credit_Api"]["transactionAmount"] / iu).toLocaleString("en-IN"))
          .show();
        $("#airlineActivecount").text(data["airlines_credit_Api"]["activeCount"].toLocaleString("en-IN")).show();
        $("#airlineBusinesscount").text(data["airlines_credit_Api"]["count"].toLocaleString("en-IN")).show();


      }});


  // mobileCreditData
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "mobileCreditPType",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {

      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#msmePMCount").text(data["mobileCreditVndrData"][0].toLocaleString("en-IN")).show();
      $("#msmePMVolume")
        .text(parseInt(data["mobileCreditVndrData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#mobileActiveCount").text(data["mobileCreditVndrData"][2].toLocaleString("en-IN")).show();
     $("#mobileBusinessCount").text(data["mobileCreditVndrData"][3].toLocaleString("en-IN")).show();



      $("#gstMsmePMCount").text(data["mobileCreditGSTData"][0].toLocaleString("en-IN")).show();
      $("#gstMsmePMVolume")
        .text(parseInt(data["mobileCreditGSTData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#gstActiveCount").text(data["mobileCreditGSTData"][2].toLocaleString("en-IN")).show();
      $("#gstMBCount").text(data["mobileCreditGSTData"][3].toLocaleString("en-IN")).show();


    } else {
    }
  });


  // gst ICICI and AXIS
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "gstDirectData",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
   
      $("#gstAxisCount").text(data["axisGST"][0].toLocaleString("en-IN")).show();
      $("#gstAxisVolume")
        .text(parseInt(data["axisGST"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#axisGSTActiveCount")
        .text(parseInt(data["axisGST"][2] ).toLocaleString("en-IN"))
        .show();
      $("#axisGSTBusinessCount")
        .text(parseInt(data["axisGST"][3]).toLocaleString("en-IN"))
        .show();


      $("#otherAxisPMCount").text(data["axisOthers"][0].toLocaleString("en-IN")).show();
      $("#otherAxisPMVolume")
        .text(parseInt(data["axisOthers"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#axisOtherActiveCount")
        .text(parseInt(data["axisGST"][2]).toLocaleString("en-IN"))
        .show();
      $("#axisOtherBCount")
        .text(parseInt(data["axisGST"][3]).toLocaleString("en-IN"))
        .show();


      $("#gstIciciPMCount").text(data["iciciGST"][0].toLocaleString("en-IN")).show();
      $("#gstIciciPMVolume")
        .text(parseInt(data["iciciGST"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#iciciGSTActiveCount")
        .text(parseInt(data["iciciGST"][2] ).toLocaleString("en-IN"))
        .show();
      $("#iciciGSTBusinessCount")
        .text(parseInt(data["iciciGST"][3]).toLocaleString("en-IN"))
        .show();


      $("#otherIciciPMCount").text(data["iciciOthers"][0].toLocaleString("en-IN")).show();
      $("#otherIciciPMVolume")
        .text(parseInt(data["iciciOthers"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#iciciOtherActiveCount")
        .text(parseInt(data["iciciOthers"][2]).toLocaleString("en-IN"))
        .show();
      $("#iciciOtherBCount")
        .text(parseInt(data["iciciOthers"][3]).toLocaleString("en-IN"))
        .show();
   
    } else {
    }
  });
  
});
}



