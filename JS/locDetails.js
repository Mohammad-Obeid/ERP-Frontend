function back() {
  localStorage.removeItem("selectedLocation");
  location.href = "locations.html";
}

function fetchbalance(id) {
  fetch(`http://localhost:8080/api/v1/product-movement/location/${id}`)
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
    <td>${element.productId}</td>
    <td>${element.productName}</td>
    <td>${element.quantity}</td>
  `;
        container.appendChild(trr);
      });
    });
}

class Location {
  constructor(id, locationName, locationCode) {
    this.id = id;
    this.locationName = locationName;
    this.locationCode = locationCode;
  }
}

const raw = localStorage.getItem("selectedLocation");
const data = JSON.parse(raw);

const loca = new Location(data.id, data.locationName, data.locationCode);

const inputs = document.querySelectorAll(".inputx");
inputs[0].value = loca.id;
inputs[1].value = loca.locationName;
inputs[2].value = loca.locationCode;
fetchbalance(loca.locationName);
