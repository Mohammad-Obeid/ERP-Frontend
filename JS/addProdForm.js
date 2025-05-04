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
        sels[0].appendChild(option1); // this will now work correctly
      });
      const loc = JSON.parse(localStorage.getItem("selectedLocation"));
      if (loc != null) {
        sels[0].value = loc.locationName;
        console.log(loc.locationName);
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
function addNewProduct() {
  const inputs = document.querySelectorAll(".form-control");
  const newprod = new Product(inputs[0].value, inputs[1].value);
  fetch(`http://localhost:8080/api/v1/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newprod),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Cant Add New Product");
      return response.json();
    })
    .then((data) => {
      const sel = document.getElementById("toLocationSelect");
      const movement = new Movement(sel.value, data.id, inputs[2].value);
      console.log(sel.value);
      fetch(`http://localhost:8080/api/v1/product-movement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movement),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Can't Add Movement");
          return response.json();
        })
        .then((data) => {
          inputs.forEach((input) => {
            if (input.type === "text") input.value = "";
            const loc = JSON.parse(localStorage.getItem("selectedLocation"));
            console.log(loc);
            if (loc === null) {
              location.href = "products.html";
            } else {
              // localStorage.removeItem('selectedLocation')
              location.href = "locationDetails.html";
            }
          });
        });
    });
}
