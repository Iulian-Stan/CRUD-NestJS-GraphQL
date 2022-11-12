import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDto {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
