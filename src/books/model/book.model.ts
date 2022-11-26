import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/model';

@ObjectType()
@Table
export class Book extends Model {
  @Field(type => Int)
  id: number;

  @Field({ description: 'Book title' })
  @Column
  title: string;

  @Field({ description: 'Book author' })
  @Column
  author: string;

  @Field({ description: 'Book description' })
  @Column
  description: string;

  @ForeignKey(type => User)
  ownerId: number;

  @Field(type => User, { description: 'Book\'s owner' })
  @BelongsTo(() => User)
  owner: User;
}
