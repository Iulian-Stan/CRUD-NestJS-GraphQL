import { Test, TestingModule } from '@nestjs/testing';
import { BookDto } from './model';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';

describe('BooksResolver', () => {
  let booksResolver: BooksResolver;
  let booksService: BooksService;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BooksResolver,
        {
          provide: BooksService,
          useValue: {}
        },
        {
          provide: UsersService,
          useValue: {}
        }
      ]
    }).compile();

    booksResolver = app.get<BooksResolver>(BooksResolver);
    booksService = app.get<BooksService>(BooksService);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(booksResolver).toBeDefined();
  });
});