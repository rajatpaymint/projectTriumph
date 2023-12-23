// Broad merchant API's calling
var date1 = document.getElementById("entered_date1").value;
var date2 = document.getElementById("entered_date2").value;
var csrf_token = document.getElementById("csrf").value;

// DB Sync Latest time
$.ajax({
  type: "GET",
  url: "dbSyncTime",
  headers: { "X-CSRFToken": csrf_token },
}).done(function (data) {
  if (data["status"] == 200) {
    var dbSyncTime = document.getElementById("dbSyncTime");
    // dbSyncTime.textContent = data["latestDateTime"];
  } else {
  }
});

// PMX Split
$(document).ready(function () {
  //   pmx Data
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "pmxCreditData",
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
      $("#pmxPMCreditVolume")
        .text(parseInt(data["pmxCreditData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#pmxPMCreditRevenue")
        .text(parseInt(data["pmxCreditData"][2] / iu + data["pmxCreditData"][4] / iu).toLocaleString("en-IN"))
        .show();
      $("#pmxPMCreditPayout")
        .text(parseInt(data["pmxCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      $("#pmxPMCreditGP")
        .text(parseInt((data["pmxCreditData"][2] + data["pmxCreditData"][4] - data["pmxCreditData"][3]) / iu).toLocaleString("en-IN"))
        .show();
      var pmxbps = parseInt(((data["pmxCreditData"][2] + data["pmxCreditData"][4] - data["pmxCreditData"][3]) * 100 * 100) / data["pmxCreditData"][1]);
      if (pmxbps == "NaN") {
        var pmxbps = 0;
      }
      $("#pmxPMCreditbps").text(pmxbps.toLocaleString("en-IN")).show();
    } else {
    }
  });

  // ---------------------------------------------------------------------------------

  // Indigo
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "indigoCreditData",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#indigomePMCount").text(data["indigoCreditData"][0].toLocaleString("en-IN")).show();
      $("#indigomePMVolume")
        .text(parseInt(data["indigoCreditData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#indigomePMRevenue")
        .text(parseInt(data["indigoCreditData"][2] / iu).toLocaleString("en-IN"))
        .show();
      $("#indigomePMPayout")
        .text(parseInt(data["indigoCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      $("#indigomePMGP")
        .text(parseInt(data["indigoCreditData"][2] / iu - data["indigoCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      var mcbps = ((data["indigoCreditData"][2] - data["indigoCreditData"][3]) * 100 * 100) / data["indigoCreditData"][1];
      // Change to Zero if NaN
      if (mcbps == "NaN") {
        var mcbps = 0;
      }
      $("#indigomePMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
    } else {
    }
  });

  //  -------------------------------------------------------------------------

  // iciciCreditData

  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "iciciCreditData",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#icicimePMCount").text(data["iciciCreditData"][0].toLocaleString("en-IN")).show();
      $("#icicimePMVolume")
        .text(parseInt(data["iciciCreditData"][1] / iu).toLocaleString("en-IN"))
        .show();
      var revenue = parseInt(data["iciciCreditData"][2] / iu + data["iciciCreditData"][4] / iu);
      $("#icicimePMRevenue").text(parseInt(revenue).toLocaleString("en-IN")).show();
      $("#icicimePMPayout")
        .text(parseInt(data["iciciCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      $("#icicimePMGP")
        .text(parseInt(revenue - data["iciciCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      var mcbps = ((revenue - data["iciciCreditData"][3]) * 100 * 100) / data["iciciCreditData"][1];
      // Change to Zero if NaN
      if (mcbps == "NaN") {
        var mcbps = 0;
      }

      $("#icicimePMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
    } else {
    }
  });

  //  --------------------------------------------------------------------------
  // mobileCreditData
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "mobileCreditData",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#msmePMCount").text(data["mobileCreditData"][0].toLocaleString("en-IN")).show();
      $("#msmePMVolume")
        .text(parseInt(data["mobileCreditData"][1] / iu).toLocaleString("en-IN"))
        .show();
      var revenue = parseInt(data["mobileCreditData"][2] / iu + data["mobileCreditData"][4] / iu);
      $("#msmePMRevenue").text(parseInt(revenue).toLocaleString("en-IN")).show();
      $("#msmePMPayout")
        .text(parseInt(data["mobileCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      $("#msmePMGP")
        .text(parseInt(revenue - data["mobileCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      var mcbps = ((revenue - data["mobileCreditData"][3]) * 100 * 100) / data["mobileCreditData"][1];
      // Change to Zero if NaN
      if (mcbps == "NaN") {
        var mcbps = 0;
      }
      $("#msmePMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
    } else {
    }
  });

  // -----------------------------------------------------------

  // cabCreditData
  // $.ajax({
  //   data: {
  //     date1: date1,
  //     date2: date2,
  //   },
  //   type: "POST",
  //   url: "cabCreditData",
  // }).done(function (data) {
  //   if (data["status"] == 200) {
  //     let currency = data["currency"];
  //     if (currency == "INR") {
  //       var iu = 1;
  //     } else {
  //       var iu = parseInt(data["usdToINR"]);
  //     }
  //     $("#cabmePMCount").text(data["cabCreditData"][0].toLocaleString("en-IN")).show();
  //     $("#cabmePMVolume")
  //       .text(parseInt(data["cabCreditData"][1] / iu).toLocaleString("en-IN"))
  //       .show();
  //     $("#cabmePMRevenue")
  //       .text(parseInt(data["cabCreditData"][2] / iu).toLocaleString("en-IN"))
  //       .show();
  //     $("#cabmePMPayout")
  //       .text(parseInt(data["cabCreditData"][3] / iu).toLocaleString("en-IN"))
  //       .show();
  //     $("#cabmePMGP")
  //       .text(parseInt(data["cabCreditData"][2] / iu - data["cabCreditData"][3] / iu).toLocaleString("en-IN"))
  //       .show();
  //     var mcbps = ((data["cabCreditData"][2] - data["cabCreditData"][3]) * 100 * 100) / data["cabCreditData"][1];
  //     // Change to Zero if NaN
  //     if (mcbps == "NaN") {
  //       var mcbps = 0;
  //     }
  //     $("#cabmePMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
  //   } else {
  //   }
  // });

  //  ----------------------------------------------------------

  // Airasia
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "airAsiaCreditData",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#aamePMCount").text(data["airAsiaCreditData"][0].toLocaleString("en-IN")).show();
      $("#aamePMVolume")
        .text(parseInt(data["airAsiaCreditData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#aamePMRevenue")
        .text(parseInt(data["airAsiaCreditData"][2] / iu).toLocaleString("en-IN"))
        .show();
      $("#aamePMPayout")
        .text(parseInt(data["airAsiaCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      $("#aamePMGP")
        .text(parseInt(data["airAsiaCreditData"][2] / iu - data["airAsiaCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      var mcbps = ((data["airAsiaCreditData"][2] - data["airAsiaCreditData"][3]) * 100 * 100) / data["airAsiaCreditData"][1];
      // Change to Zero if NaN
      if (mcbps == "NaN") {
        var mcbps = 0;
      }
      $("#aamePMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
    } else {
    }
  });

  //  --------------------------------------------------------

  // Spice Jet
  // $.ajax({
  //   data: {
  //     date1: date1,
  //     date2: date2,
  //   },
  //   type: "POST",
  //   url: "spiceJetCreditData",
  // }).done(function (data) {
  //   if (data["status"] == 200) {
  //     let currency = data["currency"];
  //     if (currency == "INR") {
  //       var iu = 1;
  //     } else {
  //       var iu = parseInt(data["usdToINR"]);
  //     }
  //     $("#sjPMCount").text(data["spiceJetCreditData"][0].toLocaleString("en-IN")).show();
  //     $("#sjPMVolume")
  //       .text(parseInt(data["spiceJetCreditData"][1] / iu).toLocaleString("en-IN"))
  //       .show();
  //     $("#sjPMRevenue")
  //       .text(parseInt(data["spiceJetCreditData"][2] / iu).toLocaleString("en-IN"))
  //       .show();
  //     $("#sjPMPayout")
  //       .text(parseInt(data["spiceJetCreditData"][3] / iu).toLocaleString("en-IN"))
  //       .show();
  //     $("#sjPMGP")
  //       .text(parseInt(data["spiceJetCreditData"][2] / iu - data["spiceJetCreditData"][3] / iu).toLocaleString("en-IN"))
  //       .show();
  //     var mcbps = ((data["spiceJetCreditData"][2] - data["spiceJetCreditData"][3]) * 100 * 100) / data["spiceJetCreditData"][1];
  //     // Change to Zero if NaN
  //     if (mcbps == "NaN") {
  //       var mcbps = 0;
  //     }
  //     $("#sjPMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
  //   } else {
  //   }
  // });

  // -----------------------------------------------------

  // GOAir
  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "goAirCreditData",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }
      $("#goAirPMCount").text(data["goAirCreditData"][0].toLocaleString("en-IN")).show();
      $("#goAirPMVolume")
        .text(parseInt(data["goAirCreditData"][1] / iu).toLocaleString("en-IN"))
        .show();
      $("#goAirPMRevenue")
        .text(parseInt(data["goAirCreditData"][2] / iu).toLocaleString("en-IN"))
        .show();
      $("#goAirPMPayout")
        .text(parseInt(data["goAirCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      $("#goAirPMGP")
        .text(parseInt(data["goAirCreditData"][2] / iu - data["goAirCreditData"][3] / iu).toLocaleString("en-IN"))
        .show();
      var mcbps = ((data["goAirCreditData"][2] - data["goAirCreditData"][3]) * 100 * 100) / data["goAirCreditData"][1];
      // Change to Zero if NaN
      if (mcbps == "NaN") {
        var mcbps = 0;
      }
      $("#goAirPMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
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
      $("#idePMRevenue")
        .text(parseInt(data["idEData"][2] / iu).toLocaleString("en-IN"))
        .show();
      $("#idePMPayout").text("0").show();
      $("#idePMGP")
        .text(parseInt(data["idEData"][2] / iu).toLocaleString("en-IN"))
        .show();
      var mcbps = (data["idEData"][2] * 100 * 100) / data["idEData"][1];
      // Change to Zero if NaN
      if (mcbps == "NaN") {
        var mcbps = 0;
      }
      $("#idePMbps").text(parseInt(mcbps).toLocaleString("en-IN")).show();
    } else {
    }
  });

  $.ajax({
    data: {
      date1: date1,
      date2: date2,
    },
    type: "POST",
    url: "uae_index",
    headers: { "X-CSRFToken": csrf_token },
  }).done(function (data) {
    if (data["status"] == 200) {
      let currency = data["currency"];
      if (currency == "INR") {
        var iu = 1;
      } else {
        var iu = parseInt(data["usdToINR"]);
      }

      var pv = document.getElementById("uaePV");
      pv.textContent = data["currency"] + " " + parseInt(data["amount"] / iu).toLocaleString("en-IN");

      var Rev = document.getElementById("uaeRev");
      Rev.textContent = data["currency"] + " " + parseInt(data["revenue"] / iu).toLocaleString("en-IN");

      var GP = document.getElementById("uaeGP");
      GP.textContent = data["currency"] + " " + parseInt(data["GP"] / iu).toLocaleString("en-IN");

      var pvword = document.getElementById("uaePVword");
      pvword.textContent = data["amountInWord"];

      var Revword = document.getElementById("uaeRevword");
      Revword.textContent = data["revenueInWord"];

      var GPword = document.getElementById("uaeGPword");
      GPword.textContent = data["gpInWord"];

      var preloader = document.getElementById("UAE_DIV");
      // function preLoaderHandler(){
      preloader.style.visibility = "visible";
      //
      var loaderuae = document.getElementById("loaderuae");
      loaderuae.style.visibility = "hidden";
    } else {
    }
  });
});

$.ajax({
  type: "POST",
  url: "getSixMonthsPV",
  headers: { "X-CSRFToken": csrf_token },
}).done(function (data) {
  if (data["status"] == 200) {
    monthsList = data["monthsList"];
    sixMonthPV = data["sixMonthPV"];
    sixMonthUAEPV = data["sixMonthUAEPV"];

    for (let i = 1; i < monthsList.length + 1; i++) {
      var j = document.getElementById("pvh" + i);
      j.textContent = monthsList[i - 1];
    }

    for (let i = 1; i < sixMonthPV.length + 1; i++) {
      var j = document.getElementById("pvd" + i);
      j.textContent = sixMonthPV[i - 1].toFixed(2);
    }

    for (let i = 1; i < monthsList.length + 1; i++) {
      var j = document.getElementById("uaeh" + i);
      j.textContent = monthsList[i - 1];
    }

    for (let i = 1; i < sixMonthUAEPV.length + 1; i++) {
      var j = document.getElementById("uaed" + i);
      j.textContent = sixMonthUAEPV[i - 1].toFixed(2);
    }

    var preloader = document.getElementById("sixMonthsPVTable");
    preloader.style.visibility = "visible";

    var preloader = document.getElementById("sixMonthsUAEPVTable");
    preloader.style.visibility = "visible";

    var loader = document.getElementById("loadersixmontsPV");
    loader.style.visibility = "hidden";

    var loader1 = document.getElementById("loadersixmontsPV1");
    loader1.style.visibility = "hidden";
  } else {
  }
});


    $.ajax({
      type: "POST",
      url: "getSixMonthsMobilePV",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      if (data["status"] == 200) {
        monthsList = data["monthsList"];

        sixMonthPV = data["sixMonthPV"];
        for (let i = 1; i < monthsList.length + 1; i++) {
          var j = document.getElementById("pvhm" + i);
          j.textContent = monthsList[i - 1];
        }

        for (let i = 1; i < sixMonthPV.length + 1; i++) {
          var j = document.getElementById("pvdm" + i);
          j.textContent = sixMonthPV[i - 1].toFixed(2);
        }

        var preloader = document.getElementById("sixMonthsMobilePVTable");
        preloader.style.visibility = "visible";
      } else {
      }
    });


// GST Data
$.ajax({
  data: {
    date1: date1,
    date2: date2,
  },
  type: "POST",
  url: "gstData",
  headers: { "X-CSRFToken": csrf_token },
}).done(function (data) {
  if (data["status"] == 200) {
    let currency = data["currency"];
    if (currency == "INR") {
      var iu = 1;
    } else {
      var iu = parseInt(data["usdToINR"]);
    }
    $("#gstCount").text(data["gstData"][0].toLocaleString("en-IN")).show();
    $("#gstVolume")
      .text(parseInt(data["gstData"][1] / iu).toLocaleString("en-IN"))
      .show();
    $("#gstRevenue")
      .text(parseInt(data["gstData"][2] / iu + data["gstData"][4] / iu).toLocaleString("en-IN"))
      .show();
    $("#gstPayout")
      .text(parseInt(data["gstData"][3] / iu).toLocaleString("en-IN"))
      .show();
    $("#gstGP")
      .text(parseInt((data["gstData"][2] + data["gstData"][4] - data["gstData"][3]) / iu).toLocaleString("en-IN"))
      .show();
    var pmxbps = parseInt(((data["gstData"][2] + data["gstData"][4] - data["gstData"][3]) * 100 * 100) / data["gstData"][1]);
    if (pmxbps == "NaN") {
      var pmxbps = 0;
    }
    $("#gstbps").text(pmxbps.toLocaleString("en-IN")).show();
  } else {
  }
});

// Direct Tax Data
$.ajax({
  data: {
    date1: date1,
    date2: date2,
  },
  type: "POST",
  url: "directTaxData",
  headers: { "X-CSRFToken": csrf_token },
}).done(function (data) {
  if (data["status"] == 200) {
    let currency = data["currency"];
    if (currency == "INR") {
      var iu = 1;
    } else {
      var iu = parseInt(data["usdToINR"]);
    }
    $("#directTaxCount").text(data["directTaxData"][0].toLocaleString("en-IN")).show();
    $("#directTaxVolume")
      .text(parseInt(data["directTaxData"][1] / iu).toLocaleString("en-IN"))
      .show();
    $("#directTaxRevenue")
      .text(parseInt(data["directTaxData"][2] / iu + data["directTaxData"][4] / iu).toLocaleString("en-IN"))
      .show();
    $("#directTaxPayout")
      .text(parseInt(data["directTaxData"][3] / iu).toLocaleString("en-IN"))
      .show();
    $("#directTaxGP")
      .text(parseInt((data["directTaxData"][2] + data["directTaxData"][4] - data["directTaxData"][3]) / iu).toLocaleString("en-IN"))
      .show();
    var pmxbps = parseInt(((data["directTaxData"][2] + data["directTaxData"][4] - data["directTaxData"][3]) * 100 * 100) / data["directTaxData"][1]);
    if (pmxbps == "NaN") {
      var pmxbps = 0;
    }
    $("#directTaxbps").text(pmxbps.toLocaleString("en-IN")).show();
  } else {
  }
});


// Utiltity bill payment
$.ajax({
  data: {
    date1: date1,
    date2: date2,
  },
  type: "POST",
  url: "utilityBillData",
  headers: { "X-CSRFToken": csrf_token },
}).done(function (data) {
  if (data["status"] == 200) {
    let currency = data["currency"];
    if (currency == "INR") {
      var iu = 1;
    } else {
      var iu = parseInt(data["usdToINR"]);
    }
    console.log(data);
    $("#utilityBillCount").text(data["utilityBillData"][0].toLocaleString("en-IN")).show();
    $("#utilityBillVolume")
      .text(parseInt(data["utilityBillData"][1] / iu).toLocaleString("en-IN"))
      .show();
    $("#utilityBillRevenue")
      .text(parseInt(data["utilityBillData"][2] / iu + data["utilityBillData"][4] / iu).toLocaleString("en-IN"))
      .show();
    $("#utilityBillPayout")
      .text(parseInt(data["utilityBillData"][3] / iu).toLocaleString("en-IN"))
      .show();
    $("#utilityBillGP")
      .text(parseInt((data["utilityBillData"][2] + data["utilityBillData"][4] - data["utilityBillData"][3]) / iu).toLocaleString("en-IN"))
      .show();
    var pmxbps = parseInt(((data["utilityBillData"][2] + data["utilityBillData"][4] - data["utilityBillData"][3]) * 100 * 100) / data["utilityBillData"][1]);
    if (pmxbps == "NaN") {
      var pmxbps = 0;
    }
    $("#utilityBillbps").text(pmxbps.toLocaleString("en-IN")).show();
  } else {
  }
});

// Direct Tax Data
$.ajax({
  data: {
    date1: date1,
    date2: date2,
  },
  type: "POST",
  url: "collectionData",
  headers: { "X-CSRFToken": csrf_token },
}).done(function (data) {
  if (data["status"] == 200) {
    let currency = data["currency"];
    if (currency == "INR") {
      var iu = 1;
    } else {
      var iu = parseInt(data["usdToINR"]);
    }
    $("#collectionCount").text(data["collectionData"][0].toLocaleString("en-IN")).show();
    $("#collectionVolume")
      .text(parseInt(data["collectionData"][1] / iu).toLocaleString("en-IN"))
      .show();
    $("#collectionRevenue")
      .text(parseInt(data["collectionData"][2] / iu + data["collectionData"][4] / iu).toLocaleString("en-IN"))
      .show();
    $("#collectionPayout")
      .text(parseInt(data["collectionData"][3] / iu).toLocaleString("en-IN"))
      .show();
    $("#collectionGP")
      .text(parseInt((data["collectionData"][2] + data["collectionData"][4] - data["collectionData"][3]) / iu).toLocaleString("en-IN"))
      .show();
    var pmxbps = parseInt(((data["collectionData"][2] + data["collectionData"][4] - data["collectionData"][3]) * 100 * 100) / data["collectionData"][1]);
    if (pmxbps == "NaN") {
      var pmxbps = 0;
    }
    $("#collectionbps").text(pmxbps.toLocaleString("en-IN")).show();
  } else {
  }
});