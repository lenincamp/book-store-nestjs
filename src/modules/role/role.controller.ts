import { UpdateRoleDto } from './dtos/update-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ReadRoleDto } from './dtos/read-role.dto';
import { RoleService } from './role.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) { }

  @Get(':roleId')
  getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
    return this._roleService.get(roleId);
  }

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Put(':roleId')
  updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto>) {
    return this._roleService.update(roleId, role);
  }

  @Put(':roleId')
  deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this._roleService.delete(roleId);
  }
}
