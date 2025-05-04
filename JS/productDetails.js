function fetchbalance(id) {
  fetch(`http://localhost:8080/api/v1/product-movement/product/${id}`)
    .then((response) => {
      if (!response.ok) {
        const section = document.querySelector(".table-section");
        section.style.visibility = "hidden";
        throw new Error("No Available Data");
      }
      return response.json();
    })
    .then((data) => {
      let i = 0;
      const container = document.getElementById("container");
      container.innerHTML = "";
      data.forEach((element) => {
        const trr = document.createElement("tr");
        i += 1;
        trr.innerHTML = `
              <td>${element.productName}</td>
              <td>${element.location}</td>
              <td>${element.quantity}</td>
            `;
        container.appendChild(trr);
      });
    });
}

class Product {
  constructor(id, name, barcode) {
    this.id = id;
    this.name = name;
    this.barcode = barcode;
  }
}

const raw = localStorage.getItem("selectedProduct");
const data = JSON.parse(raw);
const prod = new Product(data.id, data.name, data.barcode);
const inputs = document.querySelectorAll(".inputx");
inputs[0].value = prod.id;
inputs[1].value = prod.name;
inputs[2].value = prod.barcode;

fetchbalance(prod.id);
