class Product {
  constructor(productName, productBarcode) {
    this.productName = productName;
    this.productBarcode = productBarcode;
  }
}
function back() {
  const loc = JSON.parse(localStorage.getItem("selectedLocation"));
  if (loc === null) {
    location.href = "products.html";
  } else {
    location.href = "locationDetails.html";
  }
}

function getLocation() {
  const sels = document.querySelectorAll(".form-select");
  fetch("http://localhost:8080/api/v1/location/list")
    .then((res) => res.json())
    .then((data) => {
      const locations = data.locations;
      locations.forEach((loc) => {
        const option1 = document.createElement("option");
        option1.value = loc.locationName;
        option1.textContent = `${loc.locationName} (${loc.locationCode})`;
        sels[0].appendChild(option1);
      });
      const loc = JSON.parse(localStorage.getItem("selectedLocation"));
      if (loc != null) {
        sels[0].value = loc.locationName;
        sels[0].disabled = true;
      }
    })
    .catch((err) => {
      console.error("Failed to load locations:", err);
    });
}

getLocation();
class Movement {
  constructor(toLocation, productId, quantity) {
    this.toLocation = toLocation;
    this.productId = productId;
    this.quantity = quantity;
  }
}

document.querySelector("form").addEventListener("submit", addNewProduct);

function addNewProduct(event) {
  event.preventDefault();

  const inputs = document.querySelectorAll("input.form-control");
  const sel = document.getElementById("toLocationSelect");

  const productName = inputs[0].value.trim();
  const productBarcode = inputs[1].value.trim();
  const quantity = inputs[2].value.trim();

  if (!productName || !productBarcode || !quantity || !sel.value) {
    alert("Please fill in all required fields.");
    return;
  }

  const newprod = new Product(productName, productBarcode);

  fetch(`http://localhost:8080/api/v1/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newprod),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Can't Add New Product");
      return response.json();
    })
    .then((data) => {
      const movement = new Movement(sel.value, data.id, quantity);

      return fetch(`http://localhost:8080/api/v1/product-movement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movement),
      });
    })
    .then((response) => {
      if (!response.ok) throw new Error("Can't Add Movement");
      return response.json();
    })
    .then(() => {
      const loc = JSON.parse(localStorage.getItem("selectedLocation"));
      if (loc === null) {
        location.href = "products.html";
      } else {
        location.href = "locationDetails.html";
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong. Check the console for details.");
    });
}
