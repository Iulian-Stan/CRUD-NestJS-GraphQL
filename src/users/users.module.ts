import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule), SequelizeModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
