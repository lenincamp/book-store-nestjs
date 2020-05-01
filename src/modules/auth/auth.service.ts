import { RoleType } from './../role/role-type.enum';
import { IJwtPayload } from './jwt-payload.interface';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthRepository } from './auth.repository';
import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, email } = signUpDto;
    const userExist = await this._authRepository.findOne({
      where: [{ username }, { email }]
    });

    if (userExist) {
      throw new ConflictException('username or email already exists');
    }

    return this._authRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { username, password } = signInDto;
    const user: User = await this._authRepository.findOne({
      where: { username }
    });

    if (!user) {
      throw new NotFoundException('user does not exists');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles.map(role => role.name as RoleType)
    }

    const token = await this._jwtService.sign(payload);
    return { token };
  }
}
