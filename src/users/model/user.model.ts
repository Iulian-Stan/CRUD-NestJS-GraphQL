import { Column, Model, Table, HasMany, PrimaryKey } from 'sequelize-typescript';
import { ObjectType, Field } from '@nestjs/graphql';
import { Book } from '../../books/model';

@ObjectType()
@Table
export class User extends Model {
  @Column
  @Field({ description: 'User\'s name' })
  name: string;

  @PrimaryKey
  @Column
  @Field({ description: 'User\'s email' })
  email: string;

  @Column
  @Field({ description: 'User\'s password' })
  password: string;

  @HasMany(() => Book, { foreignKey: { allowNull: false }})
  @Field(type => [Book], { nullable: true,  description: 'User\'s books' })
  books: Book[];
}
