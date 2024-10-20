
const Registration = (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const profileImage = document.getElementById("profileImage").files[0];

    // Create a FormData object to handle file upload
    let formData = new FormData();
    formData.append("user.username", username);
    formData.append("user.first_name", firstName);
    formData.append("user.last_name", lastName);
    formData.append("user.email", email);
    formData.append("user.password", password);
    formData.append("user.confirm_password", confirmPassword);
    formData.append("profile_image", profileImage);

    // Password validation logic
    if (password === confirmPassword){
      document.getElementById("passord-error").innerText = "";
      if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){

        fetch("https://myhotel-owvc.onrender.com/user/register/", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
              document.getElementById('successModal').style.display = 'block';
            } else {
                alert("Error during registration");
                console.error("Registration error:", data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred during registration.");
        });
        
      }else{
        const error = document.getElementById("passord-error");
        error.innerText = "Password must contain at least one letter, number, and special character.";
      }
    }else{
      const error = document.getElementById("passord-error");
      error.innerText = "Passwords do not match!";
    }
};

const closeModal = () => {
  document.getElementById('successModal').style.display = 'none';
}

  