import { LoggedInDto } from './dto/logged-in.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService) { }

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this._authService.signUp(signUpDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() sigInDto: SignInDto): Promise<LoggedInDto> {
    return this._authService.signIn(sigInDto);
  }
}
