export function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "";
  
    const icono = document.createElement("span");
    icono.classList.add("icon");
  
    if (tipo === "success") {
      icono.textContent = "✅";
      mensaje.className = "mensaje success";
    } else if (tipo === "error") {
      icono.textContent = "❌";
      mensaje.className = "mensaje error";
    }
  
    mensaje.appendChild(icono);
    mensaje.appendChild(document.createTextNode(" " + texto));
    mensaje.style.display = "flex";
  }