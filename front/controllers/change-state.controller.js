export async function changeBookState(bookId, nuevoEstado) {
    try {
      const response = await fetch(`http://localhost:3000/book/state/${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
  
      if (!response.ok) throw new Error("Fallo en la actualización de estado");
      return { success: true };
    } catch (error) {
      console.error("Error al cambiar estado del libro:", error);
      return { success: false, error };
    }
  }
  