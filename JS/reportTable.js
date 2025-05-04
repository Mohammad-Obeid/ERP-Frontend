let currentPage = 0;
function getMovements(page) {
  fetch(`http://localhost:8080/api/v1/product-movement?page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error("No Available Data");
      return response.json();
    })
    .then((data) => {
      const cont = document.getElementById("table-container");
      cont.innerHTML = "";
      const moves = data.moves;
      document.getElementById("currentPage").textContent = `Page ${
        data.pageNum + 1
      }`;
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
        tr.innerHTML = `
                    <td>${element.productId}</td>
                    <td>${element.fromLocation}</td>
                    <td>${element.toLocation}</td>
                    <td>${element.quantity}</td>
                    <td>${formatted}</td>
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
