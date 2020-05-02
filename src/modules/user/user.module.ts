import { RoleRepository } from './../role/role.repository';
import { AuthModule } from './../auth/auth.module';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository]), AuthModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
