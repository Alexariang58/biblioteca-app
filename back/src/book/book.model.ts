// src/book/book.model.ts
export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public year: number,
    public category: string,
    public estado: string = 'disponible',
  ) {}
}