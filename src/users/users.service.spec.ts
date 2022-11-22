import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { User, UserDto } from './model';
import { UsersService } from './users.service';

const usersArray: UserDto[] = [
  {
    name: 'name #1',
    email: 'email #1',
    password: 'pass #1'
  },
  {
    name: 'name #2',
    email: 'email #2',
    password: 'pass #1'
  },
];

const oneUser: UserDto = {
  name: 'name #1',
  email: 'email #1',
  password: 'pass #1'
};

describe('UserService', () => {
  let usersService: UsersService;
  let usersModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(oneUser),
            findAll: jest.fn().mockResolvedValue(usersArray),
            findByPk: jest.fn().mockResolvedValue(oneUser),
            destroy: jest.fn()
          }
        }
      ]
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      expect(usersService.create(oneUser)).resolves.toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await usersService.findAll();
      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(usersModel, 'findByPk');
      expect(usersService.findOne(1)).resolves.toEqual(oneUser);
      expect(findSpy).toBeCalledWith(1);
    });
  });

  describe('delete()', () => {
    it('should delete a user if found', async () => {
      const mockUser = { destroy: jest.fn(), ...oneUser };
      const findSpy = jest.spyOn(usersModel, 'findByPk').mockReturnValue(mockUser as any);
      const retVal = await usersService.delete(2);
      expect(findSpy).toBeCalledWith(2);
      expect(mockUser.destroy).toBeCalled();
      expect(retVal).toMatchObject(oneUser);
    });

    it('should do nothing if user not found', async () => {
      const findSpy = jest.spyOn(usersModel, 'findByPk').mockReturnValue(undefined);
      const retVal = await usersService.delete(2);
      expect(findSpy).toBeCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });

  describe('update()', () => {
    it('should update a user if found', async () => {
      const mockUser = { update: jest.fn().mockResolvedValue(oneUser) };
      const findSpy = jest.spyOn(usersModel, 'findByPk').mockReturnValue(mockUser as any);
      const retVal = await usersService.update(2, oneUser);
      expect(findSpy).toBeCalledWith(2);
      expect(mockUser.update).toBeCalled();
      expect(retVal).toEqual(oneUser);
    });

    it('should do nothing if user not found', async () => {
      const findSpy = jest.spyOn(usersModel, 'findByPk').mockReturnValue(undefined);
      const retVal = await usersService.update(2, oneUser);
      expect(findSpy).toBeCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });
});