const handleLogout = (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
        alert("No token found, you are not logged in.");
        return;
    }

    // Clear localStorage and alert user
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    console.log("logout")
    window.location.href = "login.html";
    // alert("Logged out successfully!");
};
