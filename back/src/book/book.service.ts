import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Book } from './book.model';

@Injectable()
export class BookService {
  private books: Book[] = [];
  private history: Book[] = []; // Pila
  private waitlist: Book[] = []; // Cola
  private booksPath = path.join(process.cwd(), 'dist', 'data', 'books.json');

  constructor() {
    this.loadBooksFromFile();
  }

  private loadBooksFromFile() {
    if (fs.existsSync(this.booksPath)) {
      const data = fs.readFileSync(this.booksPath, 'utf8');
      try {
        const parsed = JSON.parse(data);
        this.books = Array.isArray(parsed.books) ? parsed.books : [];
        this.history = Array.isArray(parsed.historial) ? parsed.historial : [];
        this.waitlist = Array.isArray(parsed.colaEspera)
          ? parsed.colaEspera
          : [];
      } catch (err) {
        console.error('Error al parsear el archivo JSON:', err.message);
        this.books = [];
        this.history = [];
        this.waitlist = [];
      }
    } else {
      this.books = [];
      this.history = [];
      this.waitlist = [];
    }
  }

  private saveBooksToFile() {
    const data = {
      books: this.books,
      historial: this.history,
      colaEspera: this.waitlist,
    };
    fs.writeFileSync(this.booksPath, JSON.stringify(data, null, 2));
  }

  addBook(title: string, author: string, year: number, category: string): Book {
    const newBook: Book = {
      id: this.books.length + 1,
      title,
      author,
      year,
      category,
      estado: 'disponible',
    };
    this.books.push(newBook);
    this.saveBooksToFile();
    return newBook;
  }

  getAllBooks(): Book[] {
    return this.books;
  }

  searchBooks(keyword: string): Book[] {
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(keyword.toLowerCase()) ||
        book.author.toLowerCase().includes(keyword.toLowerCase()) ||
        book.category.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  addToHistory(bookId: number): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      this.history.push(book); // Pila (Stack)
      this.saveBooksToFile();
    }
  }

  addToWaitlist(bookId: number): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      this.waitlist.push(book); // Cola (Queue)
      this.saveBooksToFile();
    }
  }

  changeBookState(bookId: number, estado: string): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      book.estado = estado;
      this.saveBooksToFile();
    }
  }

  getHistory(): Book[] {
    return [...this.history].reverse(); // Últimos al principio
  }

  getWaitlist(): Book[] {
    return this.waitlist;
  }
}
