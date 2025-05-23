let currentPage = 0;
function getMovements(page) {
  fetch(`http://localhost:8080/api/v1/product-movement/new?page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error("No Available Data");
      return response.json();
    })
    .then((data) => {
      const cont = document.getElementById("table-container");
      cont.innerHTML = "";
      const moves = data.balances;
      console.log(moves);
      document.getElementById("currentPage").textContent = `Page ${
        data.pageNum + 1
      }`;
      let numOfPages = data.numOfPages;
      const nextButton = document.getElementById("nextPageBtn");
      const prevButton = document.getElementById("prevPageBtn");

      if (currentPage <= 0) {
        prevButton.disabled = true;
        prevButton.style.backgroundColor = "darkgray";
        prevButton.style.cursor = "not-allowed";
        prevButton.style.color = "white";
      } else {
        prevButton.disabled = false;
        prevButton.style.backgroundColor = "";
        prevButton.style.cursor = "pointer";
        prevButton.style.color = "";
      }

      let pageN = Number(numOfPages) - 1;

      if (currentPage >= pageN || numOfPages === 0) {
        nextButton.disabled = true;
        nextButton.style.backgroundColor = "darkgray";
        nextButton.style.cursor = "not-allowed";
        nextButton.style.color = "white";
      } else {
        nextButton.disabled = false;
        nextButton.style.backgroundColor = "";
        nextButton.style.cursor = "pointer";
        nextButton.style.color = "";
      }
      moves.forEach((element) => {
        const tr = document.createElement("tr");
        const date = new Date(element.movementDate);
        const formatted = date.toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        let prodName = "";

        tr.innerHTML = `
                    <td>${element.productName}</td>
                    <td>${element.location}</td>
                    <td>${element.quantity}</td>
                `;
        cont.appendChild(tr);
      });
    });
}
function changePage(direction) {
  if (direction === "next") {
    currentPage++;
  } else if (direction === "prev" && currentPage > 0) {
    currentPage--;
  }
  getMovements(currentPage);
}
getMovements(currentPage);
