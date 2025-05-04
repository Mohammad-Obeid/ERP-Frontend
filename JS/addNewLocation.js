function back() {
  location.href = "locations.html";
}
class Location {
  constructor(locationName, locationCode) {
    this.locationName = locationName;
    this.locationCode = locationCode;
  }
}
document.querySelector("form").addEventListener("submit", addNewlocation);
function addNewlocation() {
  const texts = document.querySelectorAll(".form-control");
  const loc = new Location(texts[0].value, texts[1].value);
  console.log(texts[0].value, texts[1].value);
  console.log("llll");

  fetch(`http://localhost:8080/api/v1/location`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loc),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Can't Add New Location, Barcode Exists");
      return response.json();
    })
    .then(() => {
      location.href = "locations.html";
    })
    .catch((err) => alert(err.message));
}
