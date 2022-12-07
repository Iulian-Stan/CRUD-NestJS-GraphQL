import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {}
        }
      ]
    }).compile();

    authResolver = app.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
  });
});