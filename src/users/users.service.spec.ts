import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './model';
import { UsersService } from './users.service';

const usersArray = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
  },
];

const oneUser = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

describe('UserService', () => {
  let service: UsersService;
  let model: typeof User;

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

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
      };
      expect(
        service.create({
          firstName: 'firstName #1',
          lastName: 'lastName #1',
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(model, 'findByPk');
      expect(service.findOne(1)).resolves.toEqual(oneUser);
      expect(findSpy).toBeCalledWith(1);
    });
  });

  describe('delete()', () => {
    it('should delete a user if found', async () => {
      const mockUser = { destroy: jest.fn(), ...oneUser };
      const findSpy = jest.spyOn(model, 'findByPk').mockReturnValue(mockUser as any);
      const retVal = await service.delete(2);
      expect(findSpy).toBeCalledWith(2);
      expect(mockUser.destroy).toBeCalled();
      expect(retVal).toMatchObject(oneUser);
    });

    it('should do nothing if user not found', async () => {
      const findSpy = jest.spyOn(model, 'findByPk').mockReturnValue(undefined);
      const retVal = await service.delete(2);
      expect(findSpy).toBeCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });

  describe('update()', () => {
    it('should update a user if found', async () => {
      const mockUser = { update: jest.fn().mockResolvedValue(oneUser) };
      const findSpy = jest.spyOn(model, 'findByPk').mockReturnValue(mockUser as any);
      const retVal = await service.update(2, oneUser);
      expect(findSpy).toBeCalledWith(2);
      expect(mockUser.update).toBeCalledWith(oneUser);
      expect(retVal).toEqual(oneUser);
    });

    it('should do nothing if user not found', async () => {
      const findSpy = jest.spyOn(model, 'findByPk').mockReturnValue(undefined);
      const retVal = await service.update(2, oneUser);
      expect(findSpy).toBeCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });
});