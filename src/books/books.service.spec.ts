import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Book, BookDto } from './model';
import { BooksService } from './books.service';

describe('BookService', () => {
  let booksService: BooksService;
  let booksModel: typeof Book;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book),
          useValue: {}
        }
      ]
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    booksModel = module.get<typeof Book>(getModelToken(Book));
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });
});