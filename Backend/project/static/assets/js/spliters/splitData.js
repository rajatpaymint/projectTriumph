var date1 = document.getElementById("entered_date1").value;
var date2 = document.getElementById("entered_date2").value;
var csrf_token = document.getElementById("csrf").value;

// PMX Split
$(function () {
  $submitButton = $("#process_pmxSplit");
  $submitButton.click(function (event) {
    $.ajax({
      data: {
        date1: date1,
        date2: date2,
      },
      type: "POST",
      url: "pmxSpliter",
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
        $("#pmxCreditCount").text(data["pmx_credit_split_API"]["count"].toLocaleString("en-IN")).show();
        $("#pmxCreditVolume")
          .text((data["pmx_credit_split_API"]["transactionAmount"] / iu).toLocaleString("en-IN"))
          .show();
        $("#pmxCreditRevenue")
          .text(((data["pmx_credit_split_API"]["serviceCharge"] + data["pmx_credit_split_API"]["invoiceCharge"]) / iu).toLocaleString("en-IN"))
          .show();
        $("#pmxCreditPayout")
          .text((data["pmx_credit_split_API"]["gatewayCharge"] / iu).toLocaleString("en-IN"))
          .show();
        $("#pmxCreditGP")
          .text(((data["pmx_credit_split_API"]["serviceCharge"] + data["pmx_credit_split_API"]["invoiceCharge"] - data["pmx_credit_split_API"]["gatewayCharge"]) / iu).toLocaleString("en-IN"))
          .show();

        // Set eft Split
        $("#pmxeftCount").text(data["pmx_eft_split_API"]["count"].toLocaleString("en-IN")).show();
        $("#pmxeftVolume")
          .text((data["pmx_eft_split_API"]["transactionAmount"] / iu).toLocaleString("en-IN"))
          .show();
        $("#pmxeftRevenue")
          .text(((data["pmx_eft_split_API"]["serviceCharge"] + data["pmx_eft_split_API"]["invoiceCharge"]) / iu).toLocaleString("en-IN"))
          .show();
        $("#pmxeftPayout")
          .text((data["pmx_eft_split_API"]["gatewayCharge"] / iu).toLocaleString("en-IN"))
          .show();
        $("#pmxeftGP")
          .text(((data["pmx_eft_split_API"]["serviceCharge"] + data["pmx_eft_split_API"]["invoiceCharge"] - data["pmx_eft_split_API"]["gatewayCharge"]) / iu).toLocaleString("en-IN"))
          .show();
      } else {
      }
    });

    //   console.clear()
    event.preventDefault();
  });
});

// PMX SPlit
$(function () {
  $submitButton = $("#process_pmxSplit1");
  $submitButton.click(function (event) {
    $.ajax({
      data: {
        date1: date1,
        date2: date2,
      },
      type: "POST",
      url: "pmxSpliter",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      if (data["status"] == 200) {
        // Set Credit split data
        $("#pmxCreditCount1").text(data["pmx_credit_split_API"]["count"].toLocaleString("en-IN")).show();
        $("#pmxCreditVolume1").text(data["pmx_credit_split_API"]["transactionAmount"].toLocaleString("en-IN")).show();
        $("#pmxCreditRevenue1")
          .text((data["pmx_credit_split_API"]["serviceCharge"] + data["pmx_credit_split_API"]["invoiceCharge"]).toLocaleString("en-IN"))
          .show();
        $("#pmxCreditPayout1").text(data["pmx_credit_split_API"]["gatewayCharge"].toLocaleString("en-IN")).show();
        $("#pmxCreditGP1")
          .text((data["pmx_credit_split_API"]["serviceCharge"] + data["pmx_credit_split_API"]["invoiceCharge"] - data["pmx_credit_split_API"]["gatewayCharge"]).toLocaleString("en-IN"))
          .show();
        $("#pmxCreditGPbps1")
          .text((((data["pmx_credit_split_API"]["serviceCharge"] + data["pmx_credit_split_API"]["invoiceCharge"] - data["pmx_credit_split_API"]["gatewayCharge"]) * 100 * 100) / data["pmx_credit_split_API"]["transactionAmount"]).toLocaleString("en-IN"))
          .show();

        // Set eft Split
        $("#pmxeftCount1").text(data["pmx_eft_split_API"]["count"].toLocaleString("en-IN")).show();
        $("#pmxeftVolume1").text(data["pmx_eft_split_API"]["transactionAmount"].toLocaleString("en-IN")).show();
        $("#pmxeftRevenue1")
          .text((data["pmx_eft_split_API"]["serviceCharge"] + data["pmx_eft_split_API"]["invoiceCharge"]).toLocaleString("en-IN"))
          .show();
        $("#pmxeftPayout1").text(data["pmx_eft_split_API"]["gatewayCharge"].toLocaleString("en-IN")).show();
        $("#pmxeftGP1")
          .text((data["pmx_eft_split_API"]["serviceCharge"] + data["pmx_eft_split_API"]["invoiceCharge"] - data["pmx_eft_split_API"]["gatewayCharge"]).toLocaleString("en-IN"))
          .show();
        $("#pmxeftGPbps1")
          .text((((data["pmx_eft_split_API"]["serviceCharge"] + data["pmx_eft_split_API"]["invoiceCharge"] - data["pmx_eft_split_API"]["gatewayCharge"]) * 100 * 100) / data["pmx_credit_split_API"]["transactionAmount"]).toLocaleString("en-IN"))
          .show();
      } else {
      }
    });

    //   console.clear()
    event.preventDefault();
  });
});

// Indigo Split data
$(function () {
  $submitButton = $("#process_indigoSplit");
  $submitButton.click(function (event) {
    $.ajax({
      data: {
        date1: date1,
        date2: date2,
        airline: "Indigo",
      },
      type: "POST",
      url: "airlineSplit",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      if (data["status"] == 200) {
        // Set Credit split data
        $("#indigoCreditCount").text(data["indigo_credit_split_API"]["count"].toLocaleString("en-IN")).show();
        $("#indigoCreditVolume").text(data["indigo_credit_split_API"]["transactionAmount"].toLocaleString("en-IN")).show();
        $("#indigoCreditRevenue").text(data["indigo_credit_split_API"]["serviceCharge"].toLocaleString("en-IN")).show();
        $("#indigoCreditPayout").text(data["indigo_credit_split_API"]["gatewayCharge"].toLocaleString("en-IN")).show();
        $("#indigoCreditGP")
          .text((data["indigo_credit_split_API"]["serviceCharge"] - data["indigo_credit_split_API"]["gatewayCharge"]).toLocaleString("en-IN"))
          .show();
        $("#indigoCreditGPbps")
          .text(parseInt(((data["indigo_credit_split_API"]["serviceCharge"] - data["indigo_credit_split_API"]["gatewayCharge"]) * 100 * 100) / data["indigo_credit_split_API"]["transactionAmount"]).toLocaleString("en-IN"))
          .show();

        // Set eft Split
        $("#indigoeftCount").text(data["indigo_eft_split_API"]["count"]).show();
        $("#indigoeftVolume").text(data["indigo_eft_split_API"]["transactionAmount"].toLocaleString("en-IN")).show();
        $("#indigoeftRevenue").text(data["indigo_eft_split_API"]["serviceCharge"].toLocaleString("en-IN")).show();
        $("#indigoeftPayout").text(data["indigo_eft_split_API"]["gatewayCharge"].toLocaleString("en-IN")).show();
        $("#indigoeftGP")
          .text((data["indigo_eft_split_API"]["serviceCharge"] - data["indigo_eft_split_API"]["gatewayCharge"]).toLocaleString("en-IN"))
          .show();
        $("#indigoeftGPbps")
          .text(parseInt(((data["indigo_eft_split_API"]["serviceCharge"] - data["indigo_eft_split_API"]["gatewayCharge"]) * 100 * 100) / data["indigo_eft_split_API"]["transactionAmount"]).toLocaleString("en-IN"))
          .show();
      } else {
      }
    });

    //   console.clear()
    event.preventDefault();
  });
});

// Airlines
$(function () {
  $submitButton = $("#process_airlinesplit");
  $submitButton.click(function (event) {
    $.ajax({
      data: {
        date1: date1,
        date2: date2,
        airline: "Airlines",
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
        $("#airlinesCreditCount").text(data["airlines_credit_Api"]["count"].toLocaleString("en-IN")).show();
        $("#airlinesCreditVolume")
          .text((data["airlines_credit_Api"]["transactionAmount"] / iu).toLocaleString("en-IN"))
          .show();
        $("#airlinesCreditRevenue")
          .text((data["airlines_credit_Api"]["serviceCharge"] / iu).toLocaleString("en-IN"))
          .show();
        $("#airlinesCreditPayout")
          .text((data["airlines_credit_Api"]["gatewayCharge"] / iu).toLocaleString("en-IN"))
          .show();
        $("#airlinesCreditGP")
          .text(((data["airlines_credit_Api"]["serviceCharge"] - data["airlines_credit_Api"]["gatewayCharge"]) / iu).toLocaleString("en-IN"))
          .show();
        // $("#airlinesCreditGPbps")
        //   .text(parseInt(((data["airlines_credit_Api"]["serviceCharge"] - data["airlines_credit_Api"]["gatewayCharge"]) * 100 * 100) / data["airlines_credit_Api"]["transactionAmount"]).toLocaleString("en-IN"))
        //   .show();

        // Set eft Split
        $("#airlineseftCount").text(data["airlines_eft_Api"]["count"].toLocaleString("en-IN")).show();
        $("#airlineseftVolume")
          .text((data["airlines_eft_Api"]["transactionAmount"] / iu).toLocaleString("en-IN"))
          .show();
        $("#airlineseftRevenue")
          .text((data["airlines_eft_Api"]["serviceCharge"] / iu).toLocaleString("en-IN"))
          .show();
        $("#airlineseftPayout")
          .text((data["airlines_eft_Api"]["gatewayCharge"] / iu).toLocaleString("en-IN"))
          .show();
        $("#airlineseftGP")
          .text(((data["airlines_eft_Api"]["serviceCharge"] - data["airlines_eft_Api"]["gatewayCharge"]) / iu).toLocaleString("en-IN"))
          .show();
        // $("#airlineseftGPbps")
        //   .text(parseInt(((data["airlines_eft_Api"]["serviceCharge"] - data["airlines_eft_Api"]["gatewayCharge"]) * 100 * 100) / data["airlines_eft_Api"]["transactionAmount"]).toLocaleString("en-IN"))
        //   .show();
      } else {
      }
    });

    //   console.clear()
    event.preventDefault();
  });
});

// CAB Split
$(function () {
  $submitButton = $("#process_cabSplit");
  $submitButton.click(function (event) {
    $.ajax({
      data: {
        date1: date1,
        date2: date2,
      },
      type: "POST",
      url: "cabSpliter",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      if (data["status"] == 200) {
        let currency = data["currency"];
        if (currency == "INR") {
          var iu = 1;
        } else {
          var iu = parseInt(data["usdToINR"]);
        }
        // Cab Credit
        $("#cabCreditCount").text(parseInt(data["cabCredit"]["count"]).toLocaleString("en-IN")).show();
        $("#cabCreditVolume")
          .text(parseInt(data["cabCredit"]["amount"] / iu).toLocaleString("en-IN"))
          .show();
        $("#cabCreditRevenue")
          .text(parseInt(data["cabCredit"]["mcharges"] / iu).toLocaleString("en-IN"))
          .show();
        $("#cabCreditPayout")
          .text(parseInt(data["cabCredit"]["pgcharges"] / iu).toLocaleString("en-IN"))
          .show();
        $("#cabCreditGP")
          .text(parseInt((data["cabCredit"]["mcharges"] - data["cabCredit"]["pgcharges"]) / iu).toLocaleString("en-IN"))
          .show();

        // Cab Eft
        $("#cabeftCount").text(parseInt(data["cabDebit"]["count"]).toLocaleString("en-IN")).show();
        $("#cabeftVolume")
          .text(parseInt(data["cabDebit"]["amount"] / iu).toLocaleString("en-IN"))
          .show();
        $("#cabeftRevenue")
          .text(parseInt(data["cabDebit"]["mcharges"] / iu).toLocaleString("en-IN"))
          .show();
        $("#cabeftPayout")
          .text(parseInt(data["cabDebit"]["pgcharges"] / iu).toLocaleString("en-IN"))
          .show();
        $("#cabeftGP")
          .text(parseInt((data["cabDebit"]["mcharges"] - data["cabDebit"]["pgcharges"]) / iu).toLocaleString("en-IN"))
          .show();
      } else {
      }
    });

    //   console.clear()
    event.preventDefault();
  });
});
