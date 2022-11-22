import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BookDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(type => Int)
  readonly ownerId: number;
}
