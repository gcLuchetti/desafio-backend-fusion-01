import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InputAuthDto } from './dto/input-auth.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { ResultAuthDto } from './dto/result-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MessageHelper } from './helpers/message.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: InputAuthDto): Promise<ResultAuthDto> {
    const user: SignInAuthDto = await this.validateUser(input);

    if (!user)
      throw new UnauthorizedException(MessageHelper.invalidEmailOrPassword);

    const authenticatedUser: ResultAuthDto = await this.signIn(user);

    return authenticatedUser;
  }

  async validateUser(input: InputAuthDto): Promise<SignInAuthDto | null> {
    let user: User;
    try {
      user = await this.usersService.findOneByEmailOrFail(input.email);
    } catch (error) {
      const msMax = 75;
      const msMin = 60;
      const ms = Math.floor(Math.random() * (msMax - msMin) + msMin);
      await new Promise((resolve) => setTimeout(resolve, ms)); //Timing Attack "fix"
      return null;
    }

    const isMatch = await compareSync(input.password, user.password);
    if (isMatch) {
      const validatedUser: SignInAuthDto = {
        userId: user.id,
        email: user.email,
      };
      return validatedUser;
    }

    return null;
  }

  async signIn(user: SignInAuthDto): Promise<ResultAuthDto> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    const signInAccess: ResultAuthDto = {
      accessToken: accessToken,
      userId: user.userId,
      email: user.email,
    };

    return signInAccess;
  }
}
