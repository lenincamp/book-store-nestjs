import { RoleType } from './../role/role-type.enum';
import { RoleGuard } from './../role/guards/role.guard';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) { }

  @Get(':id')
  // @Roles(RoleType.ADMIN)
  // @UseGuards(AuthGuard(), RoleGuard)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this._userService.get(id);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getUsers(): Promise<User[]> {
    return await this._userService.getAll();
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this._userService.create(user);
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    await this._userService.update(id, user);
    return true;
  }

  @Put(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this._userService.delete(id);
    return true;
  }

  @Post('set-role/:userId/:roleId')
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ) {
    return this._userService.setRoleToUser(userId, roleId);
  }

}
