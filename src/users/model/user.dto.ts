import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
