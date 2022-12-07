import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { BooksService } from '../books/books.service';

const user1Dto: UserDto = {
  name: 'name #1',
  email: 'email #1',
  password: 'pass #1'
};

const user2Dto: UserDto = {
  name: 'name #2',
  email: 'email #2',
  password: 'pass #2'
};

const email = 'email';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(user1Dto),
            findAll: jest.fn().mockResolvedValue([user1Dto, user2Dto]),
            findOne: jest.fn().mockResolvedValue(user1Dto),
            delete: jest.fn(),
            update: jest.fn().mockResolvedValue(user2Dto)
          }
        },
        {
          provide: BooksService,
          useValue: {}
        }
      ]
    }).compile();

    usersResolver = app.get<UsersResolver>(UsersResolver);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('createUser()', () => {
    it('should create a user', () => {
      expect(usersResolver.createUser(user1Dto)).resolves.toEqual(user1Dto);
      expect(usersService.create).toBeCalledWith(user1Dto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      expect(usersResolver.allUsers()).resolves.toEqual([user1Dto, user2Dto]);
      expect(usersService.findAll).toBeCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersResolver.user(email)).resolves.toEqual(user1Dto);
      expect(usersService.findOne).toBeCalled();
    });
  });

  describe('deleteUser()', () => {
    it('should delete a user', () => {
      usersResolver.deleteUser(email);
      expect(usersService.delete).toBeCalledWith(email);
    });
  });

  describe('updateUser()', () => {
    it('should update a user', () => {
      expect(usersResolver.updateUser(email, user2Dto)).resolves.toEqual(user2Dto);
      expect(usersService.update).toBeCalledWith(email, user2Dto);
    });
  });
});