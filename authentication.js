const Auth = () =>{
    const user_id = localStorage.getItem("user_id");
    const auth_token = localStorage.getItem("auth_token");
    if(user_id && auth_token){
        document.getElementById('login-id').style.display = 'none';
        document.getElementById('registration-id').style.display = 'none';
        document.getElementById('profile-id').style.display = 'block';
        document.getElementById('profile-logo').style.display = 'block';
    }
    else{
        document.getElementById('login-id').style.display = 'block';
        document.getElementById('registration-id').style.display = 'block';
        document.getElementById('profile-id').style.display = 'none';
        document.getElementById('profile-logo').style.display = 'none';
    }
}
Auth();