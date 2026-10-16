
let username = new URLSearchParams(window.location.search).get("user");

async function loadProfile() {
    let profile = document.getElementById("profile");

    try {
        let response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) throw new Error("User not found");

        let user = await response.json();

        profile.innerHTML = `
            <img class="profile-image" src="${user.avatar_url}">

            <h2>${user.login}</h2>

            <div class="profile-info">
                <p><b>Name:</b> ${user.name || "NULL"}</p>
                <p><b>Username:</b> ${user.login}</p>
                <p><b>Location:</b> ${user.location || "NULL"}</p>
                <p><b>Homepage:</b> ${user.blog || "NULL"}</p>
                <p><b>Followers:</b> ${user.followers}</p>
                <p><b>Following:</b> ${user.following}</p>
                <p><b>Repositories:</b> ${user.public_repos}</p>
                <p><b>Created:</b> ${new Date(user.created_at).toDateString()}</p>
            </div>

            <a class="github-button" href="${user.html_url}" target="_blank">
                Open Github Profile
            </a>
        `;

    } catch (error) {
        profile.textContent = "Unable to load profile";
    }
}

loadProfile();
