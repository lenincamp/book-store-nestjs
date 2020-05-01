import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository
  ) { }

  async get(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    const role: Role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });
    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async getAll(): Promise<Role[]> {
    return await this._roleRepository.find({ where: { status: 'ACTIVE' } });;
  }

  async create(role: Role): Promise<Role> {
    return await this._roleRepository.save(role);
  }

  async update(id: number, role: Role): Promise<void> {
    await this._roleRepository.update(id, role);
  }

  async delete(id: number): Promise<void> {
    const roleExist: Role = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });
    if (!roleExist) {
      throw new NotFoundException();
    }
    await this._roleRepository.update(id, { status: 'INACTIVE' });
  }
}
