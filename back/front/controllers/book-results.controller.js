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
    `;
    resultsContainer.appendChild(div);
  });
});
