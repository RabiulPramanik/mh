document.getElementById('add-guest-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('guest-info').style.display = 'block';
  });


const apiUrl = "https://myhotel-owvc.onrender.com/bookings/";

const PayNow = (payAmount) =>{
    const user_id = localStorage.getItem("user_id");

    // get before balance
    fetch(`https://myhotel-owvc.onrender.com/user/list/${user_id-1}/`)
    .then((res) => res.json())
    .then((data) => {
        
        if(parseFloat(data.balance) >= parseFloat(payAmount)){
        // Create the payload (data to send in the request)
        const payload = {
            balance: parseFloat(parseFloat(data.balance) - parseFloat(payAmount))
        };

        fetch(`https://myhotel-owvc.onrender.com/user/list/${user_id-1}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                // document.getElementById('successpayModal').style.display = 'block';
                createBooking(); 
            } else {
                alert('Failed pay amount.');
            }
        })
        .catch(error => {
            console.error('Error payong:', error);
            alert('An error occurred while paying then update balance.');
        });
    }
    else{
        document.getElementById('successnonpayModal').style.display = 'block';
        return;
    }
    });
}


const createBooking = async () => {
    const bookingdata = localStorage.getItem("bookingData");
    console.log(bookingdata);
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: bookingdata,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to create Booking. ${JSON.stringify(errorResponse)}`);
        }

        const data = await response.json();
        document.getElementById('successModal').style.display = 'block';
        // alert("Booking created successfully");


        console.log("Booking created successfully:", data);
        // Optionally, you can refresh the review list or clear the form
    } catch (error) {
        console.error("Error creating Booking:", error);
    }
};
const Booking = async (event) => {
    event.preventDefault(); // Prevent form submission
    document.getElementById("booking-ammount-details-container").innerHTML = "";
    document.getElementById('checkerror').style.display = 'none';
    const userId = localStorage.getItem("user_id");
    const roomId = localStorage.getItem("roomId");
    // Get form input values
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone').value;
    const nid = document.getElementById('nid').value;

    // Convert the input values (which are strings) to Date objects
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    // Calculate the time difference in milliseconds
    const timeDiff = checkoutDate - checkinDate;

    // Convert the time difference from milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    // Check if the difference is valid (e.g., checkout is after checkin)
    if (daysDiff > 0) {
        console.log(`The number of days between check-in and check-out is ${daysDiff}`);
    } else {
        document.getElementById('checkerror').style.display = 'block';
        return;
    }

    const BookingData = {
        user: userId - 1,
        room: roomId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        NID_number: nid,
        check_in: checkin,
        check_out: checkout,
        booking_type: "Upcoming"
    };
    localStorage.setItem("bookingData", JSON.stringify(BookingData));
    console.log("Booking Data:", BookingData);

    fetch(`https://myhotel-owvc.onrender.com/rooms/list/`)
        .then((res) => res.json())
        .then((rooms) =>{
            rooms.forEach(room => {
                if(room.id == roomId){
                    let roomprice = (room.price * daysDiff);
                    let total = (roomprice - 200 + 50);
                    const Container = document.getElementById("booking-ammount-details-container")
                    const div = document.createElement("div")
                    div.innerHTML = `
                        <h2>Your Price Summary</h2>
                        <ul class="price-summary">
                            <li>
                                <span>${room.room_type} room(per night-${room.price} and ${daysDiff} day)</span>
                                <span>${roomprice} BD</span>
                            </li>
                            <li>
                                <span>Discount</span>
                                <span>200 BD</span>
                            </li>
                            <li>
                                <span>VAT</span>
                                <span>50 BD</span>
                            </li>
                            <li class="total">
                                <span>Total Amount</span>
                                <span>${total} BD</span>
                            </li>
                        </ul>
                        <button onclick="PayNow(${total})" class="btn submit-btn">Pay Now</button>
                    `
                    Container.append(div)
                    document.getElementById('booking-ammount-details-container').style.display = 'block';

                }
            });
        })
        .catch((err) => console.log(err));
 
};

const closeModal = () => {
    document.getElementById('successnonpayModal').style.display = 'none';
    
  }
const closeModal2 = () => {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = "profile.html";
    
  }


