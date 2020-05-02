import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UserService } from './user.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  ParseIntPipe,
  UseGuards,
  Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) { }

  @Get(':userId')
  // @Roles(RoleType.ADMIN)
  // @UseGuards(AuthGuard(), RoleGuard)
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return this._userService.get(userId);
  }

  // @UseGuards(AuthGuard())
  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Put(':userId')
  updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() user: UpdateUserDto): Promise<ReadUserDto> {
    return this._userService.update(userId, user);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return this._userService.delete(userId);
  }

  @Post('set-role/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }

}
