const API_BASE = "http://localhost:8000/api/v1";

let token = localStorage.getItem("token") || "";

const $ = (id) => document.getElementById(id);

function setMsg(text) {
  $("msg").textContent = text || "";
}

function setAuthState() {
  $("authState").textContent = token
    ? "Logged in ✅ (token stored in localStorage for demo)"
    : "Not logged in ❌";
}

async function api(path, options = {}) {
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg = data?.detail || data?.message || JSON.stringify(data);
    throw new Error(`${res.status} ${res.statusText}: ${msg}`);
  }
  return data;
}

$("btnRegister").onclick = async () => {
  try {
    setMsg("");
    const email = $("regEmail").value.trim();
    const password = $("regPass").value;
    const data = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setMsg(`Registered: ${JSON.stringify(data, null, 2)}`);
  } catch (e) {
    setMsg(String(e));
  }
};

$("btnLogin").onclick = async () => {
  try {
    setMsg("");
    const email = $("logEmail").value.trim();
    const password = $("logPass").value;
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    token = data.access_token;
    localStorage.setItem("token", token);
    setAuthState();
    setMsg("Login successful ✅");
    await refreshTasks();
  } catch (e) {
    setMsg(String(e));
  }
};

$("btnLogout").onclick = () => {
  token = "";
  localStorage.removeItem("token");
  setAuthState();
  $("tasks").innerHTML = "";
  $("meBox").textContent = "";
  setMsg("Logged out");
};

$("btnMe").onclick = async () => {
  try {
    setMsg("");
    const me = await api("/auth/me");
    $("meBox").textContent = JSON.stringify(me, null, 2);
  } catch (e) {
    setMsg(String(e));
  }
};

$("btnCreateTask").onclick = async () => {
  try {
    setMsg("");
    const title = $("taskTitle").value.trim();
    const description = $("taskDesc").value.trim() || null;
    const created = await api("/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });
    setMsg("Task created ✅");
    $("taskTitle").value = "";
    $("taskDesc").value = "";
    await refreshTasks();
  } catch (e) {
    setMsg(String(e));
  }
};

$("btnRefresh").onclick = refreshTasks;

async function refreshTasks() {
  try {
    if (!token) return;
    const tasks = await api("/tasks");
    renderTasks(tasks);
  } catch (e) {
    setMsg(String(e));
  }
}

function renderTasks(tasks) {
  const root = $("tasks");
  root.innerHTML = "";
  tasks.forEach((t) => {
    const row = document.createElement("div");
    row.className = "task";

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = !!t.is_done;
    chk.onchange = async () => {
      try {
        await api(`/tasks/${t.id}`, {
          method: "PUT",
          body: JSON.stringify({ is_done: chk.checked }),
        });
        setMsg("Updated ✅");
        await refreshTasks();
      } catch (e) {
        setMsg(String(e));
      }
    };

    const info = document.createElement("div");
    info.style.flex = "1";
    info.innerHTML = `
      <div class="title">${escapeHtml(t.title)}</div>
      <div class="meta">id=${t.id}, owner=${t.owner_id} ${t.description ? " • " + escapeHtml(t.description) : ""}</div>
    `;

    const btnDel = document.createElement("button");
    btnDel.className = "secondary";
    btnDel.textContent = "Delete";
    btnDel.onclick = async () => {
      try {
        await api(`/tasks/${t.id}`, { method: "DELETE" });
        setMsg("Deleted ✅");
        await refreshTasks();
      } catch (e) {
        setMsg(String(e));
      }
    };

    row.appendChild(chk);
    row.appendChild(info);
    row.appendChild(btnDel);
    root.appendChild(row);
  });
}

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}

setAuthState();
if (token) refreshTasks();
