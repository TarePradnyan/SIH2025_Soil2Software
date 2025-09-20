document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.querySelector('.login-container');

    // Agar user logged in hai
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const username = localStorage.getItem('username') || "User";

        // Login button replace with welcome + logout
        loginContainer.innerHTML = `
            <span class="nav-link">👋 Welcome, ${username}</span>
            <button id="logoutBtn" class="nav-link login-btn">Logout</button>
        `;

        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.reload(); // refresh page
        });
    }
});
