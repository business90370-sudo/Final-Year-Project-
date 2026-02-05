const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const BACKEND_URL = isLocalhost 
  ? "http://localhost:5000" 
  : "https://us-central1-cyberscan-project-4b656.cloudfunctions.net/api";
const email = sessionStorage.getItem("userEmail");
const msg = document.getElementById("adminMsg");

async function loadUsers() {
  try {
    const res = await fetch(`${BACKEND_URL}/admin/users`, {
      headers: { "x-admin-email": email }
    });

    const data = await res.json();
    if (!res.ok) {
      msg.textContent = data.message || "Not allowed";
      return;
    }

    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = data.map(u => `
      <tr>
        <td style="padding:10px; border-bottom:1px solid #eee;">${u.id}</td>
        <td style="padding:10px; border-bottom:1px solid #eee;">${u.name || ""}</td>
        <td style="padding:10px; border-bottom:1px solid #eee;">${u.email}</td>
      </tr>
    `).join("");
  } catch {
    msg.textContent = "Backend not reachable ❌";
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});

loadUsers();
