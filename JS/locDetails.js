function back() {
  localStorage.removeItem("selectedLocation");
  location.href = "locations.html";
}

class LocationRes {
  constructor(moveId, prodId, fromL, code, quantity) {
    this.moveId = moveId;
    this.prodId = prodId;
    this.fromL = fromL;
    this.code = code;
    this.quantity = quantity;
  }
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
      const raw = localStorage.getItem("selectedLocation");
      const dat = JSON.parse(raw);
      console.log(data);
      let i = 0;
      const container = document.getElementById("container");
      container.innerHTML = "";

      data.forEach((element) => {
        const currenLoc = new LocationRes(
          element.moveId,
          element.productId,
          dat.locationName,
          dat.locationCode,
          element.quantity
        );
        const trr = document.createElement("tr");
        i += 1;
        trr.innerHTML = `
    <td>${element.productId}</td>
    <td>${element.productName}</td>
    <td>${element.quantity}</td>
    <td>
  <button class="btn btn-primary btn-sm" onclick='moveProd(${JSON.stringify(
    currenLoc
  )})'>
    <i class="bi bi-box-arrow-right"></i> Move
  </button>
`;
        container.appendChild(trr);
      });
    });
}

function moveProd(loc) {
  localStorage.setItem("movedProd", JSON.stringify(loc));
  location.href = "moveProduct.html";
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
