import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthDto, JwtTokenDto } from './model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(returns => JwtTokenDto, { nullable: true })
  login(@Args('loginInput') authDto: AuthDto): Promise<JwtTokenDto> {
    return this.authService.login(authDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(returns => String)
  test(): string {
    return "Pass";
  }
}