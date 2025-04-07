document.getElementById("searchBtn").addEventListener("click", async () => {
  const keyword = document.getElementById("searchInput").value;

  if (!keyword.trim()) {
    alert("Ingrese un término de búsqueda.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/book/search?q=${keyword}`);
    const books = await response.json();

    localStorage.setItem("searchResults", JSON.stringify(books));
    window.location.href = "book-results.html";
  } catch (error) {
    alert("Error en la búsqueda: " + error.message);
  }
});
