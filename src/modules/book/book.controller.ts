import { UpdateBookDto } from './dtos/update-book.dto';
import { GetUser } from './../auth/user.decorator';
import { CreateBookDto } from './dtos/create-book.dto';
import { RoleGuard } from './../role/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from './../role/role-type.enum';
import { ReadBookDto } from './dtos/read-book.dto';
import { BookService } from './book.service';
import { Controller, Get, Param, ParseIntPipe, Post, UseGuards, Body, Patch, Delete } from '@nestjs/common';
import { Roles } from '../role/decorators/role.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) { }

  @Get(':bookId')
  getBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<ReadBookDto> {
    return this._bookService.get(bookId);
  }

  @Get('author/:authorId')
  getBooksByAuthor(
    @Param('authorId', ParseIntPipe) authorId: number
  ): Promise<ReadBookDto[]> {
    return this._bookService.getBooksByAuthor(authorId);
  }

  @Get()
  getBooks(): Promise<ReadBookDto[]> {
    return this._bookService.getAll();
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBook(@Body() role: Partial<CreateBookDto>): Promise<ReadBookDto> {
    return this._bookService.create(role);
  }

  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post()
  createBookByAuthor(
    @Body() role: Partial<CreateBookDto>,
    @GetUser('id') authorId: number
  ): Promise<ReadBookDto> {
    return this._bookService.createByAuthor(role, authorId);
  }

  @Patch(':bookId')
  updateBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() role: Partial<UpdateBookDto>,
    @GetUser('id') authorId: number
  ) {
    return this._bookService.update(bookId, role, authorId);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<void> {
    return this._bookService.delete(bookId);
  }
}
