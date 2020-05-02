import { ReadUserDto } from './../../user/dto/read-user.dto';
import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ReadBookDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @Type(() => ReadUserDto)
  readonly authors: ReadUserDto[];
}