import { Test, TestingModule } from '@nestjs/testing';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { UsersService } from '../users/users.service';

describe('BooksResolver', () => {
  let booksResolver: BooksResolver;

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
  });

  it('should be defined', () => {
    expect(booksResolver).toBeDefined();
  });
});