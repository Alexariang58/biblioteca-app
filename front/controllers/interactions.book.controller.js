document.getElementById("consultarBtn").addEventListener("click", async () => {
    const bookId = document.getElementById("bookIdInput").value.trim();
    const contenedor = document.getElementById("resultado");
  
    if (!bookId) {
      alert("Debe ingresar un ID de libro.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/interact/book/${bookId}/users`);
      const users = await response.json();
  
      contenedor.innerHTML = "";
  
      if (users.length === 0) {
        contenedor.innerHTML = "<p>Ningún usuario ha leído este libro.</p>";
        return;
      }
  
      const lista = document.createElement("ul");
      users.forEach((userId) => {
        const li = document.createElement("li");
        li.textContent = `Usuario: ${userId}`;
        lista.appendChild(li);
      });
      contenedor.appendChild(lista);
    } catch (error) {
      alert("Error al obtener usuarios: " + error.message);
    }
  });
  