// for menu container
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());


const UserDetailsForHeader = () => {
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

const UserDetailforMain = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://myhotel-owvc.onrender.com/user/list/${user_id - 1}`)
      .then((res) => res.json())
      .then((data) => {
        const profile = document.getElementById("profile-header");
        profile.innerHTML= `
                <div class="profile-image-container">
                  <img src="${data.profile_image}" alt="Profile Picture" class="main-profile-img">
                </div>
                <div class="profile-details">
                  <h2 class="username">${data.user.username}</h2>
                  <p style="font-size: 18px; color: gray;">${data.user.email}</p>
                </div>
                <div class="profile-details">
                  <h2 class="username">Balance: ${data.balance}$</h2>
                </div>
        `;
        
  
      });
  };
UserDetailforMain();
UserDetailsForHeader();

const fetchUserDetailsInForm = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://myhotel-owvc.onrender.com/user/list/${user_id-1}/`)
      .then(response => response.json())
      .then(data => {
          // Pre-fill the form with the current balance
          document.getElementById('username').value = data.user.username
          document.getElementById('firstName').value = data.user.first_name
          document.getElementById('lastName').value = data.user.last_name
          document.getElementById('email').value = data.user.email
      })
      .catch(error => {
          console.error('Error fetching user details:', error);
      });
}

fetchUserDetailsInForm();


const updateInfo = (event) => {
  event.preventDefault();
  const user_id = localStorage.getItem("user_id");

  // Get the updated info from the form input
  const username = document.getElementById('username').value
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value

  const user_info = {
    user: {
          username: username,
          email: email,
          first_name: firstName,
          last_name: lastName
      }
    // balance: 500.00
  };
  console.log(user_info);


  fetch(`https://myhotel-owvc.onrender.com/user/list/${user_id-1}/`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_info),
  })
  .then(response => response.json())
  .then(data => {
      if (data.id) {
          // document.getElementById('successModal').style.display = 'block';
          alert('Information updated successfully!');
          // Optionally, you can reload the page or update the UI with new balance
      } else {
          alert('Failed to update Info.');
      }
  })
  .catch(error => {
      console.error('Error updating Info:', error);
      alert('An error occurred while updating Info.');
  });
  
}

// Function to compare two dates
const compareDates = (today, check_in, check_out) => {
  const t = new Date(today);
  const cin = new Date(check_in);
  const cout = new Date(check_out);

  if (t.getTime() < cin.getTime()) {
      return "Upcoming";
  } else if (t.getTime() > cout.getTime()) {
      return "Completed";
  } else {
      return "Runing";
  }
};


const loadBooking = () => {
  fetch("https://myhotel-owvc.onrender.com/bookings/")
  .then((res) => res.json())
  .then((data) => DisplayBooking(data))
  .catch((err) => console.log(err));
};
const DisplayBooking = (bookings) =>{
  const user_id = localStorage.getItem("user_id") - 1;
  // Get today's date
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];

  bookings.forEach(booking => {
    
    fetch(`https://myhotel-owvc.onrender.com/rooms/list/`)
    .then((res) => res.json())
    .then((data) =>{
      data.forEach(room => {
        if(booking.room == room.id && user_id == booking.user){
          if(compareDates(todayFormatted, booking.check_in, booking.check_out)=="Completed"){
            const bookingContainer = document.getElementById("all-booking-container");
            const div = document.createElement("div")
            div.classList.add("booking-item");
            div.innerHTML = `
              <p><b>Hotel Name:</b> ${room.hotel.name}</p>
              <p><b>Date:</b> ${booking.check_in} - ${booking.check_out}</p>
              <p class="btn btn-success"> ${compareDates(todayFormatted, booking.check_in, booking.check_out)}</p>
              <hr>
            `
            bookingContainer.append(div);
          }else if(compareDates(todayFormatted, booking.check_in, booking.check_out)=="Runing"){
            const bookingContainer = document.getElementById("all-booking-container");
            const div = document.createElement("div")
            div.classList.add("booking-item");
            div.innerHTML = `
              <p><b>Hotel Name:</b> ${room.hotel.name}</p>
              <p><b>Date:</b> ${booking.check_in} - ${booking.check_out}</p>
              <p class="btn btn-danger"> ${compareDates(todayFormatted, booking.check_in, booking.check_out)}</p>
              <hr>
            `
            bookingContainer.append(div);
          }else{
            const bookingContainer = document.getElementById("all-booking-container");
            const div = document.createElement("div")
            div.classList.add("booking-item");
            div.innerHTML = `
              <p><b>Hotel Name:</b> ${room.hotel.name}</p>
              <p><b>Date:</b> ${booking.check_in} - ${booking.check_out}</p>
              <p class="btn btn-warning"> ${compareDates(todayFormatted, booking.check_in, booking.check_out)}</p>
              <hr>
            `
            bookingContainer.append(div);
          }
        }
      });
    })
    .catch((err) => console.log(err));
  });
}

loadBooking();

