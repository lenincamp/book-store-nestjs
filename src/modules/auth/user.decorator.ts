import { UserDto } from './../user/dto/user.dto';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, request): UserDto => {
  return request.user;
});