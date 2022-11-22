import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/model';

@ObjectType()
@Table
export class Book extends Model {
  @Field(type => Int)
  id: number;

  @Field()
  @Column
  title: string;

  @Field()
  @Column
  author: string;

  @Field()
  @Column
  description: string;

  @ForeignKey(type => User)
  ownerId: number;

  @Field(type => User)
  @BelongsTo(() => User)
  owner: User;
}
