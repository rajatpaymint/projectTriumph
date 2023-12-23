function summation(tableId, buttonId) {
  var $buttonTC = $(buttonId);
  $buttonTC.on("click", function (e) {
    // const headers = document.querySelectorAll(".table th");
    // const collection = document.querySelectorAll(".table td");
    // const trCollection = document.querySelectorAll(".table tr");
    const headers = document.querySelectorAll(tableId + " th");
    const collection = document.querySelectorAll(tableId + " td");
    const trCollection = document.querySelectorAll(tableId + " tr");
    let lenCollection = collection.length;
    let lenHeaders = headers.length;

    var calcIndex = [];
    for (let i = 0; i < lenHeaders; i++) {
      if (headers[i].className.split(" ")[0] == "calc") {
        calcIndex.push(i);
      }
    }

    var sumIndex = [];
    for (let i = 0; i < calcIndex.length; i++) {
      let sum = 0;
      for (let j = calcIndex[i]; j < lenCollection; j += lenHeaders) {
        sum += parseFloat(collection[j].innerHTML.replace(/,/g, ""));
      }
      sumIndex.push(sum);
    }

    const trNew = document.createElement("tr");
    trNew.style.color = "#cd5c5c";
    trNew.style.fontWeight = "bold";
    let j = 0;
    for (let i = 0; i < lenHeaders; i++) {
      const tdNew = document.createElement("td");
      if (i == 0) {
        var textNew = document.createTextNode("Total");
      } else if (i != 0 && headers[i].className.split(" ")[0] == "calc") {
        var textNew = document.createTextNode(Math.round(sumIndex[j]));
        j++;
      } else {
        var textNew = document.createTextNode("-");
      }
      // const textNew = document.createTextNode("tv");
      tdNew.appendChild(textNew);
      trNew.appendChild(tdNew);
      // collection[i].append(tdNew);
    }

    trCollection[trCollection.length - 1].parentNode.insertBefore(trNew, trCollection[trCollection.length - 1].nextSibling);
  });
}
