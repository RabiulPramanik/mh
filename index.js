// for menu container
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());


const loadLocations = () => {
  fetch("https://myhotel-owvc.onrender.com/locations/list/")
  .then((res) => res.json())
  .then((data) => DisplayLocations(data))
  .catch((err) => console.log(err));
};

const DisplayLocations = (locations) => {
  locations.forEach(location => {
    const prant = document.getElementById("locations-container");
    const div = document.createElement("div")
    div.classList.add("col-md-2")
    div.innerHTML = `
        <div class="flip-card">
              <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img src="${location.location_image}" alt="Paris, France" class="card-img">
                    <div class="card-overlay">
                        <h5 class="card-title">${location.location}</h5>
                    </div>
                  </div>

                  <div onclick="storeLocationInfo(${location.id}, '${location.location}')" class="flip-card-back">
                      <p >${location.descriptions.slice(0, 100)}...</p>
                  </div>
              </div>
        </div>
    `
    prant.append(div)

  });
}

const storeLocationInfo = (locationId, locationName) =>{
  localStorage.removeItem("selectedLocationId");
  localStorage.removeItem("selectedLocationName");
  // Store location data in localStorage
  localStorage.setItem("selectedLocationId", locationId);
  localStorage.setItem("selectedLocationName", locationName);

  // Redirect to the next page
  window.location.href = "hotelsInLocation.html";
}
const storeHotelInfo = (hotelId) =>{
  localStorage.removeItem("hotelId");
  // Store location data in localStorage
  localStorage.setItem("selectedHotelId", hotelId);
  // Redirect to the next page
  window.location.href = "hotelDetails.html";
}






const loadhotels = () => {
  fetch("https://myhotel-owvc.onrender.com/hotels/list/")
  .then((res) => res.json())
  .then((data) => DisplayHotels(data))
  .catch((err) => console.log(err));
};

const DisplayHotels = (hotels) => {
  hotels.forEach(hotel => {
    const prant = document.getElementById("hotels-container");
    const div = document.createElement("div")
    div.classList.add("col-md-2")
    div.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src="${hotel.out_image}" alt="${hotel.name}" class="card-img">
                  <div class="card-overlay">
                    <h4 class="hotel-card-title">${hotel.name}</h5>
                    <h5 class="hotel-card-title">${hotel.main_location.location}</h5>
                  </div>
                </div>
                <div onclick="storeHotelInfo(${hotel.id})" class="flip-card-back">
                    <p>${hotel.descriptions.slice(0, 100)}...</p>
                </div>
            </div>
        </div>
    `
    prant.append(div)

  });
}

const UserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://myhotel-owvc.onrender.com/user/list/${user_id - 1}`)
    .then((res) => res.json())
    .then((data) => {
      // For larger screens
      const profileLogo = document.getElementById("profile-logo");
      const profileDiv = document.createElement("div");
      profileDiv.innerHTML = `
        <img src="${data.profile_image}" alt="My hotel Logo" class="profile-img">
      `;
      profileLogo.append(profileDiv);

      // For small screens small-logo-username
      const smallProfileLogo = document.getElementById("small-profile-logo");
      const smallProfileDiv = document.createElement("div");
      smallProfileDiv.innerHTML = `
        <img src="${data.profile_image}" alt="My hotel Logo" class="profile-img">
      `;
      smallProfileLogo.append(smallProfileDiv);

      const smalllogousername = document.getElementById("small-logo-username");
      smalllogousername.innerText = `${data.user.first_name} ${data.user.last_name}`
    });
};



UserDetails();
loadLocations();
loadhotels();
