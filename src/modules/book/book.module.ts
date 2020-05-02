import { AuthModule } from './../auth/auth.module';
import { UserRepository } from './../user/user.repository';
import { BookRepository } from './book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository, UserRepository]),
    AuthModule
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule { }
