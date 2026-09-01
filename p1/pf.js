const currentUser = sessionStorage.getItem("currentUser");

// Guard: Boot user back to login if not logged in
if (!currentUser) {
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    loadProfile();
});

// Load saved profile data
function loadProfile() {
    const avatar = document.getElementById("avatar-display");
    const nameInput = document.getElementById("display-name-input");
    const bioInput = document.getElementById("bio-input");

    const profileKey = "profile_" + currentUser;
    const profileData = JSON.parse(localStorage.getItem(profileKey)) || {
        displayName: currentUser,
        bio: ""
    };

    if (nameInput) nameInput.value = profileData.displayName;
    if (bioInput) bioInput.value = profileData.bio;
    if (avatar) avatar.textContent = profileData.displayName.charAt(0).toUpperCase();
}

// Save profile settings
function saveProfile() {
    const nameInput = document.getElementById("display-name-input").value.trim();
    const bioInput = document.getElementById("bio-input").value.trim();
    const statusText = document.getElementById("profile-status");

    const profileData = {
        displayName: nameInput || currentUser,
        bio: bioInput
    };

    const profileKey = "profile_" + currentUser;
    localStorage.setItem(profileKey, JSON.stringify(profileData));
    
    const avatar = document.getElementById("avatar-display");
    if (avatar) avatar.textContent = profileData.displayName.charAt(0).toUpperCase();

    if (statusText) {
        statusText.style.color = "#28a745";
        statusText.textContent = "Profile saved!";

        setTimeout(() => {
            statusText.textContent = "";
        }, 2000);
    }
}

// Logout Action
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "../index.html";
}