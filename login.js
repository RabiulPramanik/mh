
const handleLogin = (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://myhotel-owvc.onrender.com/user/login/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.token) {
          // Store token in localStorage
          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("user_id", data.user_id);

          document.getElementById('successModal').style.display = 'block';
        //   window.location.href = "profile.html";
      } else {
          alert("Invalid credentials.");
      }
  })
  .catch(err => console.error("Error logging in:", err));
};


const closeModal = () => {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = "profile.html";
  }
