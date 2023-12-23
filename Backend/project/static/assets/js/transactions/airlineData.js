function getAirlineDataByDate() {
  var date1 = document.getElementById("date1").value;
  var date2 = document.getElementById("date2").value;
  var csrf_token = document.getElementById("csrf").value;

  if (date1 != "" && date2 != "") {
    $.ajax({
      data: {
        date1: date1,
        date2: date2,
      },
      type: "POST",
      url: "transactionsAirlines",
      headers: { "X-CSRFToken": csrf_token },
    }).done(function (data) {
      mainTable = document.getElementById("table1");

      mainBody = document.getElementById("tableBody");
      // Clear only row's from table
      mainBody.innerHTML = "";

      indigo = data["indigoAirlinesTransactions"];

      indigo.forEach((todo) => {
        let newRow = document.createElement("tr");
        Object.values(todo).forEach((value) => {
          let cell = document.createElement("td");
          cell.innerText = value;
          newRow.appendChild(cell);
        });
        mainBody.appendChild(newRow);
      });
      pgStack = data["pgStackAirlinesTransactions"];

      pgStack.forEach((todo1) => {
        let newRow = document.createElement("tr");
        Object.values(todo1).forEach((value) => {
          let cell = document.createElement("td");
          cell.innerText = value;
          newRow.appendChild(cell);
        });
        mainBody.appendChild(newRow);
      });
    });
  }
}
