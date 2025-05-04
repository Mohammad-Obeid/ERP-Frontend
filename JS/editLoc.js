class Location {
  constructor(id, locationName, locationCode) {
    this.id = id;
    this.locationName = locationName;
    this.locationCode = locationCode;
  }
}

function back() {
  localStorage.removeItem("selectedLocation");
  location.href = "locations.html";
}

const raw = localStorage.getItem("selectedLocation");
const data = JSON.parse(raw);
const loca = new Location(data.id, data.locationName, data.locationCode);
const inputs = document.querySelectorAll(".inputx");
inputs[0].value = loca.id;
inputs[1].value = loca.locationName;
inputs[2].value = loca.locationCode;
fetchbalance(loca.locationName);

function edit() {
  const loc = new Location(inputs[0].value, inputs[1].value, inputs[2].value);
  fetch(`http://localhost:8080/api/v1/location`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loc),
  })
    .then((response) => {
      if (!response.ok) throw new Error("can't Update");
      return response.json();
    })
    .then((data) => {
      localStorage.removeItem("selectedLocation");
      location.href = "locations.html";
    });
}
