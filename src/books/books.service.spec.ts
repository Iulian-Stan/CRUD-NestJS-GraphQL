import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Book } from './model';
import { BooksService } from './books.service';

describe('BookService', () => {
  let booksService: BooksService;

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
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });
});