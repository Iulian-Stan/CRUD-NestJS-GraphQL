import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/model';

@ObjectType()
@Table
export class Book extends Model {
  @Field(type => Int)
  id: number;

  @Column
  @Field({ description: 'Book title' })
  title: string;

  @Column
  @Field({ description: 'Book author' })
  author: string;

  @Column
  @Field({ description: 'Book description' })
  description: string;

  @ForeignKey(type => User)
  ownerId: string;

  @BelongsTo(() => User)
  @Field(type => User, { description: 'Book\'s owner' })
  owner: User;
}
