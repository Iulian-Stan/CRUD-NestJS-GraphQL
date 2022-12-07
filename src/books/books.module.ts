import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './model';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Book]), forwardRef(() => UsersModule)],
  providers: [BooksService, BooksResolver],
  exports: [BooksService]
})
export class BooksModule {}
