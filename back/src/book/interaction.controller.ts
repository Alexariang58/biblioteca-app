import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('interact')
export class InteractionController {
  constructor(private readonly bookService: BookService) {}

  @Post(':userId/:bookId')
  addRelation(
    @Param('userId') userId: string,
    @Param('bookId') bookId: number,
  ) {
    this.bookService.addInteraction(userId, +bookId);
    return { message: 'Interacción registrada' };
  }

  @Get('user/:id/books')
  getBooksByUser(@Param('id') userId: string) {
    return this.bookService.getBooksByUser(userId);
  }

  @Get('book/:id/users')
  getUsersByBook(@Param('id') bookId: number) {
    return this.bookService.getUsersByBook(+bookId);
  }
}
