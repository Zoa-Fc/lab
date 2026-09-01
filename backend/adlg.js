function loginAdmin() {
    const passwordElement = document.getElementById("admin-password");
    const errorText = document.getElementById("error-message");

    // Clear any previous error message
    if (errorText) errorText.textContent = "";

    if (!passwordElement) {
        if (errorText) errorText.textContent = "Error: Missing input element.";
        return;
    }

    const passwordInput = passwordElement.value;

    if (passwordInput === "admin123") {
        sessionStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        // Display error message inside the HTML element
        if (errorText) {
            errorText.textContent = "Incorrect password! Try again.";
        }
    }
}