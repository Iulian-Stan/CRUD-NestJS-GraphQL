import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from '../../books/model';

@ObjectType()
@Table
export class User extends Model {
  @Field(type => Int)
  id: number;

  @Field()
  @Column
  firstName: string;

  @Field()
  @Column
  lastName: string;

  @Field(type => [Book], { nullable: true })
  @HasMany(() => Book, { foreignKey: { allowNull: false }})
  books: Book[];
}
