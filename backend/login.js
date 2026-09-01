function handleLogin(event) {
    event.preventDefault();

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const errorText = document.getElementById("error-message");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(u => u.username === enteredUsername && u.password === enteredPassword);

    if (foundUser) {
        // Save active user session BEFORE redirecting!
        sessionStorage.setItem("currentUser", foundUser.username);
        
        if (errorText) errorText.textContent = "";
        window.location.href = "p1/index.html";
    } else {
        if (errorText) errorText.textContent = "Invalid username or password!";
    }
}