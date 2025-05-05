class Movement {
  constructor(toLocation, fromLocation, productId, quantity) {
    this.toLocation = toLocation;
    this.fromLocation = fromLocation;
    this.productId = productId;
    this.quantity = quantity;
  }
}

class Movement2 {
  constructor(id, productId, quantity) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
  }
}

const mov = JSON.parse(localStorage.getItem("movement"));
const inputs = document.querySelectorAll(".inputx");
const sels = document.querySelectorAll(".form-select");

inputs[0].value = mov.id;
inputs[1].value = new Date(mov.movementDate).toLocaleString();
inputs[2].value = mov.productName;
inputs[3].value = mov.productId;
inputs[4].value = mov.quantity;

const prevMov = new Movement2(
  inputs[0].value,
  inputs[3].value,
  inputs[4].value
);

fetch("http://localhost:8080/api/v1/location/list")
  .then((res) => res.json())
  .then((data) => {
    const locations = data.locations;

    locations.forEach((loc) => {
      const option1 = document.createElement("option");
      option1.value = loc.locationName;
      option1.textContent = `${loc.locationName} (${loc.locationCode})`;

      const option2 = option1.cloneNode(true);

      sels[0].appendChild(option1);
      sels[1].appendChild(option2);
    });

    sels[0].value = mov.fromLocation;
    sels[1].value = mov.toLocation;
    newmov = new Movement(
      sels[0].value,
      sels[1].value,
      inputs[3].value,
      inputs[4].value
    );
  })
  .catch((err) => {
    console.error("Failed to load locations:", err);
  });

//     this.toLocation = toLocation;
//     this.fromLocation = fromLocation;
//     this.productId = productId;
//     this.quantity = quantity;

function update() {
  if (sels[1].value != sels[0].value) {
    newmov.toLocation = sels[1].value;
    newmov.quantity = Number(inputs[4].value);
    prevMov.quantity = Number(mov.quantity) - Number(inputs[4].value);
    upd(prevMov);
    addNewMov(newmov);

    localStorage.removeItem("movement");
    location.href = "movements.html";
  }
}

function back() {
  localStorage.removeItem("movement");
  location.href = "movements.html";
}

function upd(move) {
  fetch(`http://localhost:8080/api/v1/product-movement`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(move),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Can't Update Movement");
      return response.json();
    })
    .then(() => {});
}

function addNewMov(mov) {
  fetch(`http://localhost:8080/api/v1/product-movement`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mov),
  }).then((response) => {
    if (!response.ok) throw new Error("Can't Add Movement");
    return response.json();
  });
}
