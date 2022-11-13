import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User, UserDto } from './model';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(returns => User)
  createUser(@Args('createUserInput') user: UserDto): Promise<User> {
    return this.usersService.create(user)
  }

  @Query(returns => [User])
  allUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(returns => User, { nullable: true })
  user(@Args('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(returns => User, { nullable: true })
  deleteUser(@Args('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }

  @Mutation(returns => User, { nullable: true })
  updateUser(@Args('id') id: number, @Args('updateUserInput') user: UserDto): Promise<User> {
    return this.usersService.update(id, user);
  }
}
