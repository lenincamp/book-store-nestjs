import { ReadUserDto } from './../../user/dto/read-user.dto';
import { Expose, Exclude, Type } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @Type(() => ReadUserDto)
  user: ReadUserDto;
}