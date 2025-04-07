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
  @Post('waitlist/:id')
  addToWaitlist(@Param('id') bookId: number) {
    this.bookService.addToWaitlist(+bookId);
    return { message: 'Libro agregado a la lista de espera' };
  }

  // 6. Cambiar estado del libro (prestado, disponible, reservado, etc.)
  @Post('state/:id')
  changeState(@Param('id') bookId: number, @Body() body: { estado: string }) {
    this.bookService.changeBookState(+bookId, body.estado);
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
