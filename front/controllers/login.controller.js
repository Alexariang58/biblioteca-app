import { mostrarMensaje } from '../utils/messages.helper.js';

document.getElementById("loginBtn").addEventListener("click", async () => {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (!user || !pass) {
    mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user, password: pass }),
    });
    if (response.ok) {
      const data = await response.json(); 
      localStorage.setItem("username", user);
      mostrarMensaje("Inicio de sesión exitoso", "success");
      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1500);
    } else {
      mostrarMensaje("Credenciales incorrectas", "error");
    }
  } catch (error) {
    mostrarMensaje("Error de red: " + error.message, "error");
  }
});
