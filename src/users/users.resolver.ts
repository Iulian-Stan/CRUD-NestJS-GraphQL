import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { User, UserDto } from './model';
import { UsersService } from './users.service';
import { Book } from '../books/model';
import { BooksService } from '../books/books.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
    private readonly booksService: BooksService) {}

  @Mutation(returns => User)
  createUser(@Args('createUserInput') user: UserDto): Promise<User> {
    return this.usersService.create(user)
  }

  @Query(returns => [User])
  allUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ResolveField(returns => [Book])
  async books(@Parent() user): Promise<Book[]> {
    const { email } = user;
    return this.booksService.findByUser(email);
  }

  @Query(returns => User, { nullable: true })
  user(@Args('email') email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @Mutation(returns => User, { nullable: true })
  deleteUser(@Args('email') email: string): Promise<User> {
    return this.usersService.delete(email);
  }

  @Mutation(returns => User, { nullable: true })
  updateUser(@Args('email') email: string, @Args('updateUserInput') user: UserDto): Promise<User> {
    return this.usersService.update(email, user);
  }
}
