export async function addToWaitlist(bookId) {
    try {
      const response = await fetch(`http://localhost:3000/book/waitlist/${bookId}`, {
        method: "POST"
      });
  
      if (!response.ok) throw new Error("Fallo al agregar a la lista de espera");
      return { success: true };
    } catch (error) {
      console.error("Error al agregar a la lista de espera:", error);
      return { success: false, error };
    }
  }
  