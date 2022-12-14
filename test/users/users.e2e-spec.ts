import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { UserDto } from '../../src/users/model';

describe('Users - /users (e2e)', () => {
  const gql = '/graphql';

  const user: UserDto = {
    name: 'name #1',
    email: 'email #1',
    password: 'pass #1'
  };

  const updatedUser: UserDto = {
    name: 'name #2',
    email: 'email #1',
    password: 'pass #2'
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: './database.sqlite',
          autoLoadModels: true,
          synchronize: true,
          logging: false
        }),
        UsersModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: 'schema.gql'
        })
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({query: 'mutation {createUser(createUserInput: {name: "' + user.name + '", email: "' + user.email + '", password: "' + user.password + '"}) {name email}}'})
      .expect(200)
      .then(res => {
        expect(res.body.data.createUser).toEqual({
          name: user.name,
          email: user.email
        });
      });
  });

  it('Get all users', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({query: '{allUsers {name email}}'})
      .expect(200)
      .then(res => {
        expect(res.body.data.allUsers).toContainEqual({
          name: user.name,
          email: user.email
        });
      });
  });

  it('Get one user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({query: '{user(email: "' + user.email +'") {name email}}'})
      .expect(200)
      .then(res => {
        expect(res.body.data.user).toEqual({
          name: user.name,
          email: user.email
        });
      });
  });

  it('Update user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .expect(200)
      .send({query: 'mutation {updateUser(email: "' + user.email + '", updateUserInput: {name: "' + updatedUser.name + '", email: "' + updatedUser.email + '", password: "' + updatedUser.password + '"}) {name email}}'})
      .then(res => {
        expect(res.body.data.updateUser).toEqual({
          name: updatedUser.name,
          email: updatedUser.email
        });
      });
  });

  it('Delete user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({query: 'mutation {deleteUser(email: "' + updatedUser.email + '") {name email}}'})
      .expect(200)
      .then(res => {
        expect(res.body.data.deleteUser).toEqual({
          name: updatedUser.name,
          email: updatedUser.email
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});