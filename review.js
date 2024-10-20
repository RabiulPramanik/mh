function getStarRating(rating) {
  const fullStars = '⭐'.repeat(rating);  // Create full stars
  const emptyStars = ''.repeat(5 - rating);  // Create empty stars
  return fullStars + emptyStars;  // Concatenate full and empty stars
}

const apiUrl = "https://myhotel-owvc.onrender.com/reviews/";

const createReview = async (event) => {
    event.preventDefault(); // Prevent form submission
    const reviewText = document.getElementById("review-text").value;
    const rating = document.getElementById("rating").value;
    const hotelId = localStorage.getItem("selectedHotelId");
    const userId = localStorage.getItem("user_id");


    const reviewData = {
        user : userId - 1,
        hotel : hotelId,
        description : reviewText,
        rating : getStarRating(rating)
    };
    
    console.log("Review Data:", reviewData); 

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to create review. ${JSON.stringify(errorResponse)}`);
        }

        const data = await response.json();
        alert("Review created successfully");
        window.location.href = "hotelDetails.html";
        console.log("Review created successfully:", data);
        // Optionally, you can refresh the review list or clear the form
    } catch (error) {
        console.error("Error creating review:", error);
    }
};


const updateReview = async (reviewId) => {
    const reviewText = document.getElementById("update-review-text").value;
    const rating = document.getElementById("update-rating").value;

    try {
        const response = await fetch(`${apiUrl}${reviewId}/`, {
            method: "PATCH", // Use PATCH for partial updates
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: reviewText,
                rating: getStarRating(rating),
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update review.");
        }

        const data = await response.json();
        alert("Review updated successfully!")
        window.location.href = "hotelDetails.html";
        console.log("Review updated successfully:", data);
        // Optionally, refresh the review list
    } catch (error) {
        console.error("Error updating review:", error);
    }
};

const openUpdateModal = (reviewId) => {
    const modalcontainer = document.getElementById('updateReviewModal')
    const div = document.createElement("div")
    div.classList.add("modal-content")
    div.innerHTML = `
        <span class="close" onclick="closeModal1()">&times;</span>
        <h2>Update Review</h2>
        <form id="update-review-form" class="update-review-form">
          <div class="form-group">
            <label for="update-review-text">Your Review:</label>
            <textarea id="update-review-text" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label for="update-rating">Rating:</label>
            <select id="update-rating" required>
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
          </div>
          <button onclick="updateReview(${reviewId})" type="submit">Update Review</button>
        </form>
    `
    modalcontainer.append(div)
  document.getElementById('updateReviewModal').style.display = 'block';
  // Fetch the current review details using reviewId (replace with actual API call if needed)
  fetch(`https://myhotel-owvc.onrender.com/reviews/${reviewId}/`)
      .then(response => response.json())
      .then(data => {
          // Fill the modal form with the existing review details
          document.getElementById('update-review-text').value = data.description;
          document.getElementById('update-rating').value = data.rating.length; // Convert stars to number
      });

  // Show the modal
  // document.getElementById('updateReviewModal').style.display = 'block';
}

// Close the modal
const closeModal = () => {
  document.getElementById('successModal').style.display = 'none';
}
const closeModal1 = () => {
    document.getElementById('updateReviewModal').style.display = 'none';
  }



const deleteReview = async (reviewId) => {
    try {
        const response = await fetch(`${apiUrl}${reviewId}/`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete review.");
        }

        console.log("Review deleted successfully");
        alert("Review deleted successfully")
        window.location.href = "hotelDetails.html";
        // Optionally, refresh the review list
    } catch (error) {
        console.error("Error deleting review:", error);
    }
};




  