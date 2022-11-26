import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BookDto {
  @Field({ description: 'Book title' })
  title: string;

  @Field({ description: 'Book author' })
  author: string;

  @Field({ description: 'Book description' })
  description: string;

  @Field(type => Int, { description: 'Owner ID' })
  readonly ownerId: number;
}
