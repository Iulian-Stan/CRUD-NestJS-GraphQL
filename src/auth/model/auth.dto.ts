import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthDto {
  @Field({ description: 'User\'s email' })
  readonly email: string;

  @Field({ description: 'User\'s password' })
  readonly password: string;
}
