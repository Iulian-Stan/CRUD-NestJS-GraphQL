import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book, BookDto } from './model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private readonly bookModel: typeof Book) {}

  create(book: BookDto): Promise<Book> {
    return this.bookModel.create({
      title: book.title,
      description: book.description,
      ownerId: book.ownerId
    });
  }

  findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  findByUser(id: number): Promise<Book[]>{
    return this.bookModel.findAll({ 
      where: {
        ownerId: id
      }
    });
  }

  findOne(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async delete(id: number): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (book) await book.destroy();
    return book;
  }

  async update(id: number, book: BookDto): Promise<Book> {
    const oldBook = await this.bookModel.findByPk(id);
    return oldBook ?
      oldBook.update({
        title: book.title,
        description: book.description,
        ownerId: book.ownerId
      }) : oldBook;
  }
}
