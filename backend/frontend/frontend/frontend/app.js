async function connectVPN() {
  const res = await fetch("http://localhost:8000/connect", { method: "POST" });
  const data = await res.json();
  document.getElementById("status").innerText = "Status: " + data.status;
}

async function disconnectVPN() {
  const res = await fetch("http://localhost:8000/disconnect", { method: "POST" });
  const data = await res.json();
  document.getElementById("status").innerText = "Status: " + data.status;
}
