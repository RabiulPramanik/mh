const matchHotel = (searchString, hotelName) => {
    return hotelName.toLowerCase().includes(searchString.toLowerCase());
};

const SearchHotel = (event) => {
    event.preventDefault();
    document.getElementById('searchResultModal').style.display = 'block';
    document.getElementById("hotels-search-container").innerHTML = "";

    const HotelName = document.getElementById("HotelName").value;
    const checkIn = document.getElementById("checkin").value;
    const checkOut = document.getElementById("checkout").value;
    const RoomType = document.getElementById("roomType").value;
    fetch("https://myhotel-owvc.onrender.com/hotels/list/")
    .then((res) => res.json())
    .then((data) =>{
        let cont = 0;
        data.forEach(hotel => {
            if(matchHotel(HotelName, hotel.name)){
                cont += 1;
                const prant = document.getElementById("hotels-search-container");
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
            }
            
        });
        if(!cont){
            document.getElementById("hotels-search-container").innerHTML = "";
            const prant = document.getElementById("hotels-search-container");
            const div = document.createElement("div")
            div.classList.add("col-md-12")
            div.innerHTML = `
                <h3>There is no hotel with this name</h3>
            `
            prant.append(div)  
        }
        
    })
    .catch((err) => console.log(err));

    console.log(HotelName, checkIn, checkOut, RoomType);
}

const closeModal = () => {
    document.getElementById('searchResultModal').style.display = 'none';
  }