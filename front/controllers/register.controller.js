import { mostrarMensaje } from '../utils/messages.helper.js';
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("registerBtn");
  btn.addEventListener("click", async () => {
    const username = document.getElementById("newUser").value;
    const password = document.getElementById("newPass").value;

    if (!username || !password) {
      document.getElementById("mensaje").innerText = "Completa los campos.";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        mostrarMensaje("Usuario registrado: " + data.username, "success");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        mostrarMensaje("No se pudo registrar: "+data.message, "error");
      }
    } catch (error) {
      mostrarMensaje("Error de red: " + error.message, "error");
    }
  });
});
