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

const StoreRoomId = (roomId) =>{
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
        window.location.href = "login.html";
        return;
    }
    else{
        localStorage.setItem("roomId", roomId);
        window.location.href = "booking.html";
    }
}


const loadHotelsInLocation = () => {
    const hotelId = localStorage.getItem("selectedHotelId");
    const user_id = localStorage.getItem("user_id");
    fetch(`https://myhotel-owvc.onrender.com/hotels/${hotelId}`)
    .then((res) => res.json())
    .then((data) =>{
        const nameContainer = document.getElementById("hotel-name-container-left")
        const div1 = document.createElement("div")
        div1.classList.add("hotelName-h3")
        div1.innerHTML = `
            <h3 class = "text-warning">${data.name}</h3>
        `
        nameContainer.append(div1);
        const Container = document.getElementById("hotel-image-text")
        const div2 = document.createElement("div")
        div2.innerHTML = `
            <div class="hotel-image-container">
                <div class="one-image-container">
                    <img src="${data.out_image}" alt="Main Hotel Image">
                </div>
                <div class="one-to-four-image-container">
                    <img src="${data.in_image1}" alt="Hotel Image 1">
                    <img src="${data.in_image2}" alt="Hotel Image 2">
                    <img src="${data.in_image3}" alt="Hotel Image 3">
                    <img src="${data.in_image4}" alt="Hotel Image 1">
                    <img src="${data.in_image5}" alt="Hotel Image 2">
                    <img src="${data.in_image6}" alt="Hotel Image 3">
                </div>
            </div>
    
            <!-- Hotel Details and Google Map -->
            <h4>${data.name}</h4>
            <h4 id="rating-container"></h4> <!--⭐⭐⭐⭐⭐ Example for star rating -->
            <p>
                ${data.sub_location}, ${data.main_location.location}
                <br>
                <span class="map-icon">
                    <a style="color: rgb(0, 17, 254);" href="https://maps.google.com" target="_blank"><i class="bi bi-geo-alt"></i></a> <!-- Bootstrap map icon -->
                </span>
                <a style="color: black;" href="https://maps.google.com" target="_blank">View on Map</a>
            </p>

        `
        Container.append(div2);

        const ratingContainer = document.getElementById("rating-container")
        if (data.rating == 1) {
            ratingContainer.innerText = `⭐`;
        } else if (data.rating == 2) {
            ratingContainer.innerText = `⭐⭐`;
        }else if (data.rating == 3){
            ratingContainer.innerText = `⭐⭐⭐`;
        }else if (data.rating == 4){
            ratingContainer.innerText = `⭐⭐⭐⭐`;
        }else {
            ratingContainer.innerText = `⭐⭐⭐⭐⭐`;
        }
    
        fetch(`https://myhotel-owvc.onrender.com/rooms/list/`)
        .then((res) => res.json())
        .then((rooms) =>{
            let singleRoom = 0;
            let doubleRoom = 0;
            const singleRoomContainer = document.getElementById("all-single-rooms-container")
            const doubleRoomContainer = document.getElementById("all-double-rooms-container")
            
            rooms.forEach(room => {
                if(hotelId == room.hotel.id && room.room_type == "Single"){
                    singleRoom += 1;
                    const div3 = document.createElement("div")
                    div3.classList.add("room-card")
                    div3.innerHTML = `
                        <img src="${room.room_image}" alt="Single Room 1">
                        <h4>Price: ${room.price} USD</h4>
                        <a onclick="StoreRoomId(${room.id})" ><button>Book Now</button></a>
                    `
                    singleRoomContainer.append(div3)
                }
                else if(hotelId == room.hotel.id && room.room_type == "Double"){
                    doubleRoom += 1;
                    const div3 = document.createElement("div")
                    div3.classList.add("room-card")
                    div3.innerHTML = `
                        <img src="${room.room_image}" alt="Single Room 1">
                        <h4>Price: ${room.price} USD</h4>
                        <a onclick="StoreRoomId(${room.id})" href="booking.html"><button>Book Now</button></a>
                    `
                    doubleRoomContainer.append(div3)
                }
            });
            const singleRoomFound = document.getElementById("single-room-found")
            singleRoomFound.innerText = `Available Single Bed Rooms: ${singleRoom}`;
            const doubleRoomFound = document.getElementById("double-room-found")
            doubleRoomFound.innerText = `Available Double Bed Rooms: ${doubleRoom}`;
        })
        .catch((err) => console.log(err));


        fetch(`https://myhotel-owvc.onrender.com/reviews/`)
        .then((res) => res.json())
        .then((reviews) =>{
            const reviewContainer = document.getElementById("reviews-container")
            reviews.forEach(review =>{
                if(hotelId == review.hotel){
                    fetch(`https://myhotel-owvc.onrender.com/user/list/${review.user}`)
                    .then((res) => res.json())
                    .then((user) =>{
                        const div4 = document.createElement("div")
                        div4.classList.add('review-item')
                        div4.innerHTML = `
                            <div>
                              <p class="review-name">${user.user.username}</p>
                              <p class="review-rating">${review.rating}</p>
                              <p>${review.description}</p>
                            </div>
                            <div id="updateDelete-buttom">
                            <button onclick="openUpdateModal(${review.id})">Edit</button>
                            <button onclick="deleteReview(${review.id})">Delete</button>
                            </div>
                        `
                        reviewContainer.append(div4)
                        console.log(user_id, user.user.id)
                        if(user_id == user.user.id){
                          document.getElementById('updateDelete-buttom').style.display = 'block';
                        }else{
                          document.getElementById('updateDelete-buttom').style.display = 'none';
                        }

                    })
                    .catch((err) => console.log(err));  
                }
            })
        })
        .catch((err) => console.log(err));
  
    })
    .catch((err) => console.log(err));
};

const getValue = (id) => {
    return document.getElementById(id).value;
};

const UpdateAndDeleteButtomShow = () =>{

}


loadHotelsInLocation();