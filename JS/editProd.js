class Product {
  constructor(id, productName, productBarcode) {
    this.id = id;
    this.productName = productName;
    this.productBarcode = productBarcode;
  }
}
const raw = localStorage.getItem("selectedProduct");
const data = JSON.parse(raw);
const prod = new Product(data.id, data.name, data.barcode);
const inputs = document.querySelectorAll(".form-control");
inputs[0].value = prod.id;
inputs[1].value = prod.productName;
inputs[2].value = prod.productBarcode;

function edit() {
  const inputs = document.querySelectorAll(".form-control");
  const newProd = new Product(
    inputs[0].value,
    inputs[1].value,
    inputs[2].value
  );
  console.log(JSON.stringify(newProd));
  fetch(`http://localhost:8080/api/v1/product`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProd),
  })
    .then((response) => {
      if (!response.ok) throw new Error("an Error Happend");
      return response.json();
    })
    .then((data) => {
      console.log("Product updated:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
