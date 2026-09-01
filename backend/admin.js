

// Check if the admin is logged in
const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn");

if (!isAdminLoggedIn) {
    // Kick them back to adlg.html if the key isn't found
    window.location.href = "adlg.html";
}

// Toggle User List Visibility
function toggleUserList() {
    const container = document.getElementById("user-container");
    if (container.style.display === "none") {
        container.style.display = "block";
        renderUsers();
    } else {
        container.style.display = "none";
    }
}

// Render Users List with Ban Button
function renderUsers() {
    const list = document.getElementById("user-list");
    list.innerHTML = "";
    
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        list.innerHTML = "<li class='empty-msg'>No users found.</li>";
        return;
    }

    users.forEach((user, index) => {
        const li = document.createElement("li");
        li.className = "user-item";
        
        const userInfo = document.createElement("span");
        userInfo.textContent = `User: ${user.username} | Pass: ${user.password}`;

        const banBtn = document.createElement("button");
        banBtn.className = "ban-btn";
        banBtn.textContent = "Ban";
        banBtn.onclick = function() {
            banUser(index);
        };

        li.appendChild(userInfo);
        li.appendChild(banBtn);
        list.appendChild(li);
    });
}

// Ban (Remove) an Individual User
function banUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
}

// Terminal Command Handler
function executeCommand() {
    const inputField = document.getElementById("command-input");
    const output = document.getElementById("command-output");
    const command = inputField.value.trim().toLowerCase();

    output.style.color = "red";

    if (command === "rm -a usr") {
        localStorage.removeItem("users");
        renderUsers();
        output.style.color = "#28a745";
        output.textContent = "All users removed successfully.";
    } else if (command === "shutdown") {
        localStorage.setItem("serverShutdown", "true");
        output.textContent = "Server is down.";
    } else if (command === "start" || command === "restore") {
        localStorage.setItem("serverShutdown", "false");
        output.style.color = "#28a745";
        output.textContent = "Server is live.";
    } else {
        output.textContent = `Unknown command: ${command}`;
    }

    inputField.value = "";
    checkShutdownStatus();
}

// Check Server Status for Indicator
function checkShutdownStatus() {
    const isShutdown = localStorage.getItem("serverShutdown") === "true";
    const statusText = document.getElementById("status-text");
    
    if (statusText) {
        if (isShutdown) {
            statusText.textContent = "Status: SERVER IS DOWN";
            statusText.style.color = "red";
        } else {
            statusText.textContent = "Status: SERVER IS LIVE";
            statusText.style.color = "#28a745";
        }
    }
}

// Run status check when script loads
checkShutdownStatus();