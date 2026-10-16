
const developerBox = document.getElementById("developers");

async function loadDevelopers() {
    try {
        let res = await fetch("https://api.github.com/users");
        if (!res.ok) throw new Error("API Error");

        let users = await res.json();
        let selected = users.sort(() => Math.random() - 0.5).slice(0, 6);

        let developers = await Promise.all(
            selected.map(async user => {
                let res = await fetch(user.url);
                if (!res.ok) throw new Error("Profile Error");
                return res.json();
            })
        );

        developerBox.innerHTML = developers.map(user => `
            <div class="card">
                <img src="${user.avatar_url}" alt="Avatar">
                <h3>${user.login}</h3>
                <p>Homepage: ${user.blog || "NULL"}</p>
                <p>Location: ${user.location || "NULL"}</p>
                <p>Admin: ${user.site_admin}</p>
                <a href="profile.html?user=${encodeURIComponent(user.login)}">
                    View Profile
                </a>
            </div>
        `).join("");

    } catch (error) {
        console.log(error);
        developerBox.textContent = "Unable to load GitHub users";
    }
}

// Load and refresh every 20 seconds
loadDevelopers();
setInterval(loadDevelopers, 20000);

// Search developer
function searchUser() {
    let username = document.getElementById("username").value.trim();

    if (!username) return alert("Enter GitHub username");

    window.location.href =
        "profile.html?user=" + encodeURIComponent(username);
}
