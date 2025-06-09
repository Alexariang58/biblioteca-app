import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // 1. Agregar libro tipo Arreglo
  @Post('add')
  addBook(
    @Body()
    body: {
      title: string;
      author: string;
      year: number;
      category: string;
    },
  ) {
    return {
      code: 'ok',
      response: this.bookService.addBook(
        body.title,
        body.author,
        body.year,
        body.category,
      ),
    };
  }

  // 2. Obtener todos los libros
  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  // 3. Buscar libros estructura lineal Arreglo
  @Get('search')
  searchBooks(@Query('q') keyword: string) {
    return this.bookService.searchBooks(keyword);
  }
  //4. Historial  estructura pila
  @Post('history/:id')
  addToHistory(@Param('id') bookId: number) {
    this.bookService.addToHistory(+bookId);
    return { message: 'Libro agregado al historial' };
  }

  // 5. Agregar a la lista de espera (tipo cola)
  @Post('waitlist')
  addToWaitlist(@Body() body: { bookId: number, userId: string }) {
    this.bookService.addToWaitlist(body.bookId);
    this.bookService.addInteraction(body.userId, body.bookId);
    return { message: 'Libro agregado a la lista de espera' };
  }

  // 6. Cambiar estado del libro (prestado, disponible, reservado, etc.)
  @Post('state/:id')
  changeState(@Param('id') bookId: number, @Body() body: { estado: string, userId: string }) {
    this.bookService.changeBookState(+bookId, body.estado);
    if (body.estado === 'prestado' && body.userId) {
      this.bookService.addToHistory(+bookId, body.userId);
    }
    return { message: 'Estado actualizado correctamente' };
  }

  // 7. Consultar historial
  @Get('history')
  getHistory() {
    return this.bookService.getHistory();
  }

  // 8. Consultar lista de espera
  @Get('waitlist')
  getWaitlist() {
    return this.bookService.getWaitlist();
  }
}
