import { mostrarMensaje } from '../utils/messages.helper.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bookForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value);
    const category = document.getElementById("category").value;

    if (!title || !author || !year || !category) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/book/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, year, category }),
      });

      const data = await response.json();
      console.log(data);
      
      if (data.code = 'ok') {
        mostrarMensaje("Libro agregado: ", "success");
       } else {
          throw new error();
        }
    } catch (error) {
      mostrarMensaje("Error al registrar libro: " + error.message, "error");
    }
  });
});
