function handleCreateAccount(event) {
    event.preventDefault();

    // 1. Get input values and the message element FIRST
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const successText = document.getElementById("success-message");

    // 2. Save user credentials into the users array
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username: usernameInput, password: passwordInput });
    localStorage.setItem("users", JSON.stringify(users));

    // 3. Show the inline success message
    if (successText) {
        successText.textContent = "Account created successfully. Now, you can login";
    }

    // 4. Wait 2 seconds, then redirect to index.html
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
}