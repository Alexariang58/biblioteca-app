import { changeBookState } from "./change-state.controller.js";
import { addToWaitlist } from "./add-to-waitlist.controller.js";

document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("resultsContainer");
  const storedResults = localStorage.getItem("searchResults");

  if (!storedResults) {
    resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  const books = JSON.parse(storedResults);

  if (books.length === 0) {
    resultsContainer.innerHTML = "<p>No se encontraron libros.</p>";
    return;
  }

  books.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Año:</strong> ${book.year}</p>
      <p><strong>Categoría:</strong> ${book.category}</p>
      <p><strong>Estado:</strong> ${book.estado}</p>
      <button class="solicitar-btn" data-id="${book.id}" data-estado="${book.estado}">Solicitar</button>
    `;

    resultsContainer.appendChild(div);
  });

  document.querySelectorAll(".solicitar-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const bookId = btn.getAttribute("data-id");
      const estado = btn.getAttribute("data-estado");

      if (estado === "disponible") {
        const result = await changeBookState(bookId, "prestado");
        if (result.success) {
          alert("📚 Puedes llevarte tu libro. Tienes un plazo de entrega de 30 días.");
          window.location.href = "menu.html";
        } else {
          alert("❌ Error al actualizar el estado del libro.");
        }
      } else if (estado === "prestado") {
        const confirmacion = confirm("🚫 El libro está prestado. ¿Quieres unirte a la lista de espera?");
        if (confirmacion) {
          const result = await addToWaitlist(bookId);
          if (result.success) {
            alert("✅ Has sido agregado a la lista de espera.");
            window.location.href = "menu.html";
          } else {
            alert("❌ Error al agregar a la lista de espera.");
          }
        }
      }
    });
  });
});
