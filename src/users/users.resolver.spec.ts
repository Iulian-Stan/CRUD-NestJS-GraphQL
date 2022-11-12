import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

const userDto: UserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

const users: UserDto[] = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1'
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2'
  }
];

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
            create: jest.fn().mockResolvedValue({ id: 1, ...userDto }),
            findAll: jest.fn().mockResolvedValue(users),
            findOne: jest.fn().mockResolvedValue({ id: 1, ...userDto }),
            delete: jest.fn(),
            update: jest.fn()
          }
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
      expect(usersResolver.createUser(userDto)).resolves.toEqual({ id: 1, ...userDto });
      expect(usersService.create).toBeCalledWith(userDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      expect(usersResolver.allUsers()).resolves.toEqual(users);
      expect(usersService.findAll).toBeCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersResolver.user(1)).resolves.toEqual({ id: 1, ...userDto });
      expect(usersService.findOne).toBeCalled();
    });
  });

  describe('deleteUser()', () => {
    it('should delete a user', () => {
      usersResolver.deleteUser(2);
      expect(usersService.delete).toBeCalledWith(2);
    });
  });

  describe('updateUser()', () => {
    it('should update a user', () => {
      usersResolver.updateUser(2, userDto);
      expect(usersService.update).toBeCalledWith(2, userDto);
    });
  });
});