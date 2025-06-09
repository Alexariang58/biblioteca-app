import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Book } from './book.model';

@Injectable()
export class BookService {
  private books: Book[] = [];
  private history: Book[] = []; // Pila
  private waitlist: Book[] = []; // Cola
  private graph: Map<string, Set<number>> = new Map(); // userId → Set<bookId>

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

        // 🔗 Cargar interacciones (grafo)
        if (parsed.interacciones) {
          for (const [userId, bookIds] of Object.entries(parsed.interacciones)) {
            this.graph.set(userId, new Set(bookIds as number[]));
          }
        }
      } catch (err) {
        console.error('Error al parsear el archivo JSON:', err.message);
        this.books = [];
        this.history = [];
        this.waitlist = [];
        this.graph = new Map();
      }
    } else {
      this.books = [];
      this.history = [];
      this.waitlist = [];
      this.graph = new Map();
    }
  }

  private saveBooksToFile() {
    const interacciones = {};
    this.graph.forEach((books, userId) => {
      interacciones[userId] = Array.from(books);
    });

    const data = {
      books: this.books,
      historial: this.history,
      colaEspera: this.waitlist,
      interacciones: interacciones,
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

  addToHistory(bookId: number, userId: string = 'usuario-default'): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      this.history.push(book); // Pila
      this.addInteraction(userId, bookId); // 🔗 Añadir relación al grafo
      this.saveBooksToFile();
    }
  }

  addToWaitlist(bookId: number): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      this.waitlist.push(book); // Cola
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
    return [...this.history].reverse();
  }

  getWaitlist(): Book[] {
    return this.waitlist;
  }

  // ✅ Métodos del grafo de interacciones

  addInteraction(userId: string, bookId: number): void {
    if (!this.graph.has(userId)) {
      this.graph.set(userId, new Set());
    }
    this.graph.get(userId).add(bookId);
    this.saveBooksToFile();
  }

  getBooksByUser(userId: string): Book[] {
    const bookIds = this.graph.get(userId) || new Set();
    return this.books.filter(book => bookIds.has(book.id));
  }

  getUsersByBook(bookId: number): string[] {
    const result: string[] = [];
    for (const [userId, bookIds] of this.graph.entries()) {
      if (bookIds.has(bookId)) {
        result.push(userId);
      }
    }
    return result;
  }
}
