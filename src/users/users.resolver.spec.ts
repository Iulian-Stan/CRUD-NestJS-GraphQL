import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

const userDto: UserDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

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
            create: jest
              .fn()
              .mockImplementation((user: UserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersResolver = app.get<UsersResolver>(UsersResolver);
    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('createUser()', () => {
    it('should create a user', () => {
      expect(usersResolver.createUser(userDto)).resolves.toEqual({
        id: 1,
        ...userDto,
      });
      expect(usersService.create).toHaveBeenCalled();
      expect(usersService.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersResolver.allUsers();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      usersResolver.user(1);
      expect(usersService.findOne).toHaveBeenCalled();
      expect(usersResolver.user(1)).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        id: 1,
      });
    });
  });

  describe('deleteUser()', () => {
    it('should delete a user if found', () => {
      usersResolver.removeUser(2);
      expect(usersService.findOne).toHaveBeenCalled();
    });

    it('should do nothing if user not found', () => {
      usersResolver.removeUser(2);
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('updateUser()', () => {
    it('should update a user if found', () => {
      usersResolver.updateUser(2);
      expect(usersService.findOne).toHaveBeenCalled();
    });

    it('should do nothing if user not found', () => {
      usersResolver.updateUser(2);
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });
});