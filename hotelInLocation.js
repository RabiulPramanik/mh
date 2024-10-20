// for menu container
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());

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
  
  const Logout = () => {
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")
  
    console.log(token, user_id)
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.href = "login.html";
  };
 
UserDetails();

const storeHotelInfo = (hotelId) =>{
  localStorage.removeItem("hotelId");
  // Store location data in localStorage
  localStorage.setItem("selectedHotelId", hotelId);
  // Redirect to the next page
  window.location.href = "hotelDetails.html";
}

const loadHotelsInLocation = () => {
    document.getElementById("hotels-container").innerHTML = " ";
    document.getElementById("location-container-left").innerHTML = " ";
    document.getElementById("found-container").innerHTML = " ";
    const locationId = localStorage.getItem("selectedLocationId");
    const locationName = localStorage.getItem("selectedLocationName");
    const locationcontainer = document.getElementById("location-container-left");
        locationcontainer.innerHTML = `
            <h3>${locationName}</h3>
        `
    fetch("https://myhotel-owvc.onrender.com/hotels/list/")
    .then((res) => res.json())
    .then((data) =>{
        let fountHotel = 0;
        data.forEach(hotel =>{
            if(locationId == hotel.main_location.id){
                fountHotel += 1;
            }
        })
        const found = document.getElementById("found-container");
        found.innerHTML = `
            <h4>${fountHotel} Available Hotels</h4>
        `  
        if(fountHotel == 0){

        }
        else{
            data.forEach(hotel => {
                if(locationId == hotel.main_location.id){
                    const prant = document.getElementById("hotels-container");
                    const son1 = document.createElement("div")
                    son1.classList.add("flip-card")
                    son1.innerHTML = `
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                              <img src="${hotel.out_image}" alt="Paris, France" class="card-img">
                              <div class="card-overlay">
                                <h5 class="hotel-card-title">${hotel.name}</h5>
                              </div>
                            </div>
                            <div onclick="storeHotelInfo(${hotel.id})" class="flip-card-back">
                                <p>${hotel.descriptions.slice(0, 100)}...</p>
                            </div>
                        </div>
    
                    `
                    prant.append(son1);
                }
            });
        }

    })
    .catch((err) => console.log(err));
  };

const searchByDR = (event) =>{
    event.preventDefault();

    document.getElementById("hotels-container").innerHTML = " ";
    document.getElementById("found-container").innerHTML = " ";
    const locationId = localStorage.getItem("selectedLocationId");
    const distance = getValue("location-range");
    const name = getValue("hotel-name");
    const rating = getValue("hotel-rating");
    console.log(distance, name, rating)

    fetch("https://myhotel-owvc.onrender.com/hotels/list/")
    .then((res) => res.json())
    .then((data) =>{
        let fountHotel = 0;
        data.forEach(hotel =>{
            if(locationId == hotel.main_location.id && distance >= hotel.distance && rating >= hotel.rating){
                fountHotel += 1;
            }
        })
       

        const found = document.getElementById("found-container");
        found.innerHTML = `
            <h4>${fountHotel} Available Hotels</h4>
        `  
        if(fountHotel == 0){

        }
        else{
            data.forEach(hotel => {
                if(locationId == hotel.main_location.id && distance >= hotel.distance && rating >= hotel.rating){
                    const prant = document.getElementById("hotels-container");
                    const son1 = document.createElement("div")
                    son1.classList.add("flip-card")
                    son1.innerHTML = `
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                              <img src="${hotel.out_image}" alt="Paris, France" class="card-img">
                              <div class="card-overlay">
                                <h5 class="hotel-card-title">${hotel.name}</h5>
                              </div>
                            </div>
                            <div onclick="storeHotelInfo(${hotel.id})" class="flip-card-back">
                                <p>${hotel.descriptions.slice(0, 100)}...</p>
                            </div>
                        </div>
    
                    `
                    prant.append(son1);
                }
            });
        }

    })
    .catch((err) => console.log(err));  
} 

const searchByName = (event) =>{
    event.preventDefault();

    document.getElementById("hotels-container").innerHTML = " ";
    document.getElementById("found-container").innerHTML = " ";
    const locationId = localStorage.getItem("selectedLocationId");
    const name = getValue("hotel-name");
    console.log(name)

    fetch("https://myhotel-owvc.onrender.com/hotels/list/")
    .then((res) => res.json())
    .then((data) =>{
        let fountHotel = 0;
        data.forEach(hotel =>{
            if(locationId == hotel.main_location.id && name == hotel.name){
                fountHotel += 1;
            }
        })
     

        const found = document.getElementById("found-container");
        found.innerHTML = `
            <h4>${fountHotel} Available Hotels</h4>
        `  
        if(fountHotel == 0){

        }
        else{
            data.forEach(hotel => {
                if(locationId == hotel.main_location.id && name == hotel.name){
                    const prant = document.getElementById("hotels-container");
                    const son1 = document.createElement("div")
                    son1.classList.add("flip-card")
                    son1.innerHTML = `
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                              <img src="${hotel.out_image}" alt="Paris, France" class="card-img">
                              <div class="card-overlay">
                                <h5 class="hotel-card-title">${hotel.name}</h5>
                              </div>
                            </div>
                            <div onclick="storeHotelInfo(${hotel.id})" class="flip-card-back">
                                <p>${hotel.descriptions.slice(0, 100)}...</p>
                            </div>
                        </div>
                    `
                    prant.append(son1);
                }
            });
        }

    })
    .catch((err) => console.log(err));  
}

const getValue = (id) => {
    return document.getElementById(id).value;
};

loadHotelsInLocation();

