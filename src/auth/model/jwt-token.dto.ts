import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class JwtTokenDto {
  @Field()
  readonly access_token: string;
}