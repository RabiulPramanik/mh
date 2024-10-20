
const updateUserBalance = (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("user_id");

    // Get the updated balance from the form input
    const updatedBalance = document.getElementById('amout').value;

    // Validate that the balance is a valid number
    if (isNaN(updatedBalance) || updatedBalance < 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // get before balance
    fetch(`https://myhotel-owvc.onrender.com/user/list/${user_id-1}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(parseFloat(data.balance) + parseFloat(updatedBalance))

        // Create the payload (data to send in the request)
        const payload = {
            balance: parseFloat(parseFloat(data.balance) + parseFloat(updatedBalance))
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
                document.getElementById('successModal').style.display = 'block';
                // alert('Balance updated successfully!');
                // Optionally, you can reload the page or update the UI with new balance
            } else {
                alert('Failed to update balance.');
            }
        })
        .catch(error => {
            console.error('Error updating balance:', error);
            alert('An error occurred while updating balance.');
        });
    });
    
}

const closeModal = () => {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = "profile.html";
  }
