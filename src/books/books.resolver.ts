import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Book, BookDto } from './model';
import { BooksService } from './books.service';
import { User } from '../users/model';
import { UsersService } from '../users/users.service';

@Resolver(of => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService,
    private readonly usersService: UsersService) {}

  @Mutation(returns => Book)
  createBook(@Args('createBookInput') book: BookDto): Promise<Book> {
    return this.booksService.create(book)
  }

  @Query(returns => [Book])
  allBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @ResolveField(returns => User)
  async owner(@Parent() book): Promise<User> {
    const { ownerId } = book;
    return this.usersService.findOne(ownerId);
  }

  @Query(returns => Book, { nullable: true })
  book(@Args('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Mutation(returns => Book, { nullable: true })
  deleteBook(@Args('id') id: number): Promise<Book> {
    return this.booksService.delete(id);
  }

  @Mutation(returns => Book, { nullable: true })
  updateBook(@Args('id') id: number, @Args('updateBookInput') book: BookDto): Promise<Book> {
    return this.booksService.update(id, book);
  }
}
