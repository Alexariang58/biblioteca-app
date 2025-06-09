document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("resultado");
  const username = localStorage.getItem("username");
  console.log('username: ', username);
  if (!username) {
    contenedor.innerHTML = "<p>No se encontró información de usuario. Por favor, inicia sesión.</p>";
    return;
  }

  try {
    // Obtener el usuario por username
    const userResponse = await fetch(`http://localhost:3000/user/username/${username}`);
    if (!userResponse.ok) {
      contenedor.innerHTML = "<p>No se encontró información de usuario. Por favor, inicia sesión.</p>";
      return;
    }
    const usuario = await userResponse.json();

    // Ahora obtener el historial de libros
    const response = await fetch(`http://localhost:3000/interact/user/${usuario.id}/books`);
    const books = await response.json();

    contenedor.innerHTML = "";

    if (books.length === 0) {
      contenedor.innerHTML = "<p>No tienes historial de lectura.</p>";
      return;
    }

    const lista = document.createElement("ul");
    books.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = `${book.title} (${book.year}) - ${book.author}`;
      lista.appendChild(li);
    });
    contenedor.appendChild(lista);
  } catch (error) {
    contenedor.innerHTML = "<p>Error al obtener historial: " + error.message + "</p>";
  }
});
  