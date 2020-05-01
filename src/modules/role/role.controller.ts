import { Role } from './role.entity';
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

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return await this._roleService.get(id);
  }

  @Get()
  async getRoles(): Promise<Role[]> {
    return await this._roleService.getAll();
  }

  @Post()
  async createRole(@Body() role: Role): Promise<Role> {
    return await this._roleService.create(role);
  }

  @Put(':id')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Role) {
    await this._roleService.update(id, role);
    return true;
  }

  @Put(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    await this._roleService.delete(id);
    return true;
  }
}
