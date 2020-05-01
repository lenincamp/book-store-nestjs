import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService) { }

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this._authService.signUp(signUpDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(@Body() sigInDto: SignInDto) {
    return this._authService.signIn(sigInDto);
  }
}
