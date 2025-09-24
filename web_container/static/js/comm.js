document.addEventListener('DOMContentLoaded', () => {
    console.log('Community page loaded.');
    // Add JavaScript for AI chatbot and community posts here
    // e.g., handling voice recording, image uploads, fetching community data
});


var socket = io();
var name;
var pincode;

function sendMessage() {
    let msg = document.getElementById("messageInput").value;
    if(msg) {
        socket.emit("message", {username: "Pradnyan", room: "401502", msg: msg});
        document.getElementById("messageInput").value = "";
    }
}

socket.on("message", function(data) {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += data + "<br>";
    chatBox.scrollTop = chatBox.scrollHeight;
});