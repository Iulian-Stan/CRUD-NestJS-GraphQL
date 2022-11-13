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

  let userId = 0;

  const user = {
    firstName: 'FirstName #1',
    lastName: 'LastName #1'
  };

  const updatedUser = {
    firstName: 'FirstName #2',
    lastName: 'LastName #2'
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
      .send({query: 'mutation {createUser(createUserInput: {firstName: "FirstName #1", lastName: "LastName #1"}) {id firstName lastName}}'})
      .expect(200)
      .then(res => {
        expect(res.body.data.createUser).toMatchObject(user);
        userId = res.body.data.createUser.id;
      });
  });

  it('Get all users', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({query: "{allUsers {firstName lastName}}"})
      .expect(200)
      .then(res => {
        expect(res.body.data.allUsers).toContainEqual(user);
      });
  });

  it('Get one user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({query: '{user(id: ' + userId + ') {firstName lastName}}'})
      .expect(200)
      .then(res => {
        expect(res.body.data.user).toEqual(user);
      });
  });

  it('Update user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .expect(200)
      .send({query: 'mutation {updateUser(id: ' + userId + ', updateUserInput: {firstName: "FirstName #2", lastName: "LastName #2"}) {firstName lastName}}'})
      .then(res => {
        expect(res.body.data.updateUser).toEqual(updatedUser);
      });
  });

  it('Delete user', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({query: 'mutation {deleteUser(id: ' + userId + ') {firstName lastName}}'})
      .expect(200)
      .then(res => {
        expect(res.body.data.deleteUser).toEqual(updatedUser);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});