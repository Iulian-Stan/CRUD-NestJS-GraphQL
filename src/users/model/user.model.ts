import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from '../../books/model';

@ObjectType()
@Table
export class User extends Model {
  @Field(type => Int)
  id: number;

  @Field({ description: 'User\'s name' })
  @Column
  name: string;

  @Field({ description: 'User\'s email' })
  @Column
  email: string;

  @Field({ description: 'User\'s password' })
  @Column
  password: string;

  @Field(type => [Book], { nullable: true,  description: 'User\'s books' })
  @HasMany(() => Book, { foreignKey: { allowNull: false }})
  books: Book[];
}
