class Location {
  constructor(id, locationName, locationCode) {
    this.id = id;
    this.locationName = locationName;
    this.locationCode = locationCode;
  }
}
let currentPage = 0;
let numOfPages = 0;
function fetchProducts(page) {
  fetch(`http://localhost:8080/api/v1/location?page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("location-container");
      container.innerHTML = ""; // Clear existing cards
      numOfPages = data.numOfPages;
      const location = data.locations;
      document.getElementById("currentPage").textContent = `Page ${
        data.pageNum + 1
      }`;

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

      let pageN = Number(numOfPages);
      console.log(pageN);

      if (currentPage >= numOfPages || numOfPages === 0) {
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

      location.forEach((location) => {
        const loc = new Location(
          location.id,
          location.locationName,
          location.locationCode
        );
        const card = document.createElement("div");
        card.className = "card";
        card.id = location.id;
        card.style.width = "18rem";
        card.innerHTML = `
            <img src="../images/locationicon.avif" class="card-img-top" style="height:180px; width:180px;" alt="Product Image">
            <div class="card-body">
              <h5 class="card-title">${location.locationName}</h5>
              <p class="card-text">Code: ${location.locationCode}</p>
              <a href="#" class="btn btn-primary" onclick='viewLocation(${JSON.stringify(
                loc
              )})'>View Details</a>
              <a href="#" class="btn btn-success" onclick='editLocation(${JSON.stringify(
                loc
              )})'>Update</a>
            </div>
          `;
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}
fetchProducts(currentPage);
function viewLocation(loc) {
  localStorage.setItem("selectedLocation", JSON.stringify(loc));
  location.href = "locationDetails.html";
}

function editLocation(loc) {
  localStorage.setItem("selectedLocation", JSON.stringify(loc));
  location.href = "editLocation.html";
}

function changePage(direction) {
  if (direction === "next") {
    if (currentPage < numOfPages) {
      currentPage++;
    }
  } else if (direction === "prev") {
    if (currentPage > 0) {
      currentPage--;
    }
  }
  fetchProducts(currentPage);
}
