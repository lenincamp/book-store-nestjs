import { ReadUserDetailDto } from './read-user-details.dto';
import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReadUserDto {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  readonly email: string;

  @IsEmail()
  readonly username: string;

  @Type(() => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;
}