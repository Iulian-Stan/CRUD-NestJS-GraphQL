import { Column, Model, Table } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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
}
