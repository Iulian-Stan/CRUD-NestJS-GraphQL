import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      autoLoadModels: true,
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ]
})
export class AppModule {}
