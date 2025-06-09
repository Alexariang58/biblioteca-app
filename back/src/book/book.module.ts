import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { InteractionController } from './interaction.controller';

@Module({
  controllers: [BookController, InteractionController],
  providers: [BookService]
})
export class BookModule {}
