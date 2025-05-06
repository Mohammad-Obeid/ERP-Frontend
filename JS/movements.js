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
let numOfPages = 0;
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
      numOfPages = data.numOfPages;
      const moves = data.moves;
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
      let pageNum = Number(numOfPages);
      if (currentPage >= pageNum || numOfPages === 0) {
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

fetchMoves(currentPage);

function editMove(move) {
  localStorage.setItem("movement", JSON.stringify(move));
  location.href = "editMove.html";
}
const nextButton = document.getElementById("nextPageBtn");
const prevButton = document.getElementById("prevPageBtn");

function changePage(direction) {
  if (direction === "next") {
    currentPage++;
  } else if (direction === "prev" && currentPage > 0) {
    currentPage--;
  }
  fetchMoves(currentPage);
}
