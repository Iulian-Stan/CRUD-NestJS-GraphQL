import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book, BookDto } from './model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private readonly bookModel: typeof Book) {}

  create(book: BookDto): Promise<Book> {
    return this.bookModel.create({
      title: book.title,
      author: book.author,
      description: book.description,
      ownerId: book.ownerId
    });
  }

  findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  findByUser(email: string): Promise<Book[]>{
    return this.bookModel.findAll({ 
      where: {
        ownerId: email
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

  async update(id: number, bookDto: BookDto): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    return book ?
      book.update({
        title: bookDto.title,
        author: bookDto.author,
        description: bookDto.description,
        ownerId: bookDto.ownerId
      }) : book;
  }
}
