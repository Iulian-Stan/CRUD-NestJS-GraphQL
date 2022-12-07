import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('jwt.secret'),
            signOptions: { expiresIn: '60s' },
          }),
          inject: [ConfigService]
        })
      ],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {}
        }
      ]
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});