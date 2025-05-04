function back() {
  localStorage.removeItem("movement");
  location.href = "index.html";
}

class Movement {
  constructor(
    id,
    movementDate,
    toLocation,
    fromLocation,
    productId,
    productName,
    quantity
  ) {
    this.id = id;
    this.movementDate = movementDate;
    this.toLocation = toLocation;
    this.fromLocation = fromLocation;
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
  }
}
let currentPage = 0;
function fetchMoves(page) {
  fetch(`http://localhost:8080/api/v1/product-movement?page=${currentPage}`)
    .then((response) => {
      if (!response.ok) throw new Error("No Moves Were Found");
      return response.json();
    })
    .then((data) => {
      document.getElementById("currentPage").textContent = `Page ${
        data.pageNum + 1
      }`;
      const container = document.getElementById("tablebody");
      container.innerHTML = "";

      const moves = data.moves;

      moves.forEach((move) => {
        const row = document.createElement("tr");
        row.id = move.id;
        var prodName = "";
        fetch(`http://localhost:8080/api/v1/product/${move.productId}`)
          .then((response) => {
            if (!response.ok) throw new Error("Product Was Not Found");
            return response.json();
          })
          .then((data) => {
            prodName = data.productName;
            const mov = new Movement(
              move.id,
              move.movementDate,
              move.toLocation,
              move.fromLocation,
              move.productId,
              prodName,
              move.quantity
            );
            row.innerHTML = `
                        <td>${move.id}</td>
                        <td>${prodName}</td>
                        <td>${move.quantity}</td>
                        <td>${move.fromLocation}</td>
                        <td>${move.toLocation}</td>
                        <td>${new Date(move.movementDate).toLocaleString()}</td>
                        <a href="#" class="btn btn-success" onclick='editMove(${JSON.stringify(
                          mov
                        )})'><i class="fas fa-edit"></i> Update</a>
                `;
            container.appendChild(row);
          });
      });
    });
}

function editMove(move) {
  localStorage.setItem("movement", JSON.stringify(move));
  location.href = "editMove.html";
}
function changePage(direction) {
  if (direction === "next") {
    currentPage++;
  } else if (direction === "prev" && currentPage > 0) {
    currentPage--;
  }
  fetchMoves(currentPage);
}

fetchMoves(currentPage);
