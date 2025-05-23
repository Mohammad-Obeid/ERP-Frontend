let currentPage = 0;
let numOfPages = 0;
class Product {
  constructor(id, name, barcode) {
    this.id = id;
    this.name = name;
    this.barcode = barcode;
  }
}
function fetchProducts(page) {
  fetch(`http://localhost:8080/api/v1/product?page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error("No Available Data");
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("product-container");
      container.innerHTML = "";

      const products = data.products;
      document.getElementById("currentPage").textContent = `Page ${
        data.pageNum + 1
      }`;
      numOfPages = data.numOfPages;
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
      console.log(pageN);
      console.log(currentPage);

      if (currentPage > pageN || numOfPages === 0) {
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

      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";
        card.id = product.id;
        card.style.width = "18rem";
        const prod = new Product(
          product.id,
          product.productName,
          product.productBarcode
        );
        // console.log(product.productName);
        // console.log(product.productBarcode);
        card.innerHTML = `
                <img src="../images/product.webp" class="card-img-top" alt="Product Image">
                <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <p class="card-text">Barcode: ${product.productBarcode}</p>
                  <a href="#" class="btn btn-primary" onclick='viewProduct(${JSON.stringify(
                    prod
                  )})'>View Details</a>
                  <a href="#" class="btn btn-success" onclick='editProduct(${JSON.stringify(
                    prod
                  )})'>Edit</a>
                </div>
              `;
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function viewProduct(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  location.href = "productDetails.html";
}

function editProduct(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  location.href = "editProduct.html";
}

function changePage(direction) {
  if (direction === "next") {
    currentPage++;
  } else if (direction === "prev" && currentPage > 0) {
    currentPage--;
  }
  fetchProducts(currentPage);
}

fetchProducts(currentPage);
class product {
  constructor(id, name, barcode) {
    this.id = id;
    this.name = name;
    this.barcode = barcode;
  }
}
