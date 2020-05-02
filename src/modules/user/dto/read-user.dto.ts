import { ReadRoleDto } from './../../role/dtos/read-role.dto';
import { ReadUserDetailDto } from './read-user-details.dto';
import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadUserDto {

  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsEmail()
  readonly username: string;

  @Expose()
  @Type(() => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type(() => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}