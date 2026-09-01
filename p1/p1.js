const currentUser = sessionStorage.getItem("currentUser");
let activeRecipient = null;

if (!currentUser) {
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById("user-heading");
    const profileBtn = document.getElementById("profile-btn");
    
    if (heading) heading.textContent = `Welcome, ${currentUser}`;
    if (profileBtn) profileBtn.textContent = currentUser.charAt(0).toUpperCase();

    renderDMList();
});

function renderDMList() {
    const listContainer = document.getElementById("user-dm-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const otherUsers = users.filter(u => u.username !== currentUser);

    if (otherUsers.length === 0) {
        listContainer.innerHTML = "<p style='color: #777;'>No other users found.</p>";
        return;
    }

    otherUsers.forEach(user => {
        const btn = document.createElement("button");
        btn.className = "user-card-btn";
        btn.innerHTML = `<span>💬</span> <strong>${user.username}</strong>`;
        btn.onclick = function() {
            openChat(user.username);
        };
        listContainer.appendChild(btn);
    });
}

function openChat(targetUser) {
    activeRecipient = targetUser;
    document.getElementById("chat-window").style.display = "block";
    document.getElementById("chat-with-title").textContent = `Chatting with ${targetUser}`;
    loadMessages();
}

function sendMessage() {
    const textInput = document.getElementById("message-input");
    const text = textInput.value.trim();

    if (!text || !activeRecipient) return;

    let allMessages = JSON.parse(localStorage.getItem("appMessages")) || [];

    allMessages.push({
        sender: currentUser,
        receiver: activeRecipient,
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    localStorage.setItem("appMessages", JSON.stringify(allMessages));
    textInput.value = "";
    loadMessages();
}

function loadMessages() {
    const box = document.getElementById("message-list");
    if (!box || !activeRecipient) return;

    box.innerHTML = "";
    let allMessages = JSON.parse(localStorage.getItem("appMessages")) || [];

    const conversation = allMessages.filter(
        m => (m.sender === currentUser && m.receiver === activeRecipient) ||
             (m.sender === activeRecipient && m.receiver === currentUser)
    );

    if (conversation.length === 0) {
        box.innerHTML = "<p style='color: #888; text-align: center; margin-top: 20px;'>No messages yet.</p>";
        return;
    }

    conversation.forEach(msg => {
        const div = document.createElement("div");
        const isMe = msg.sender === currentUser;

        div.style.marginBottom = "8px";
        div.style.textAlign = isMe ? "right" : "left";
        div.innerHTML = `
            <div style="display: inline-block; padding: 8px 12px; border-radius: 12px; background-color: ${isMe ? '#007bff' : '#e9ecef'}; color: ${isMe ? '#fff' : '#333'}; max-width: 75%; text-align: left;">
                <small style="display: block; font-size: 10px; opacity: 0.75; margin-bottom: 2px;">${msg.timestamp}</small>
                <span>${msg.content}</span>
            </div>
        `;
        box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
}