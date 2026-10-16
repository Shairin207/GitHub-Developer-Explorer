
let db;

let request = indexedDB.open("DeveloperDatabase", 1);

// Create database
request.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore("developers", { keyPath: "id" });
};

// Open database
request.onsuccess = e => {
    db = e.target.result;
    displayData();
};

// Add developer
function addDeveloper() {
    let id = document.getElementById("developerID").value.trim();
    let homepage = document.getElementById("homepage").value.trim();
    let location = document.getElementById("location").value.trim();

    if (!id || !homepage || !location)
        return alert("Fill all fields");

    if (!homepage.startsWith("http://") &&
        !homepage.startsWith("https://"))
        return alert("Invalid URL");

    let store = db.transaction("developers", "readwrite")
                  .objectStore("developers");

    let request = store.add({ id, homepage, location });

    request.onerror = () => alert("Developer ID already exists");

    request.onsuccess = () => {
        ["developerID", "homepage", "location"].forEach(id =>
            document.getElementById(id).value = ""
        );
        displayData();
    };
}

// Display developers
function displayData() {
    let store = db.transaction("developers", "readonly")
                  .objectStore("developers");

    store.getAll().onsuccess = e => {
        let data = e.target.result;
        let list = document.getElementById("developerList");

        document.getElementById("savedTitle").style.display =
            data.length ? "block" : "none";

        list.replaceChildren();

        data.forEach(dev => {
            let div = document.createElement("div");
            div.className = "developer-record";

            ["id", "homepage", "location"].forEach(key => {
                let p = document.createElement("p");
                let b = document.createElement("b");
                b.textContent = key + ": ";
                p.append(b, document.createTextNode(dev[key]));
                div.appendChild(p);
            });

            list.appendChild(div);
        });
    };
}

// Delete all
function deleteAll() {
    let tx = db.transaction("developers", "readwrite");
    tx.objectStore("developers").clear();
    tx.oncomplete = displayData;
}

// Delete last (highest ID)
function deleteLast() {
    let tx = db.transaction("developers", "readwrite");
    let store = tx.objectStore("developers");

    store.openCursor(null, "prev").onsuccess = e => {
        if (e.target.result) e.target.result.delete();
    };

    tx.oncomplete = displayData;
}
