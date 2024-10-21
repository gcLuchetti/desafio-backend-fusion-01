import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InputAuthDto } from './dto/input-auth.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { ResultAuthDto } from './dto/result-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: InputAuthDto): Promise<ResultAuthDto> {
    const user: SignInAuthDto = await this.validateUser(input);

    if (!user) throw new UnauthorizedException();

    const authenticatedUser: ResultAuthDto = await this.signIn(user);

    return authenticatedUser;
  }

  async validateUser(input: InputAuthDto): Promise<SignInAuthDto | null> {
    const user: User = await this.usersService.findOneByEmailOrFail(
      input.email,
    );

    const isMatch = await compareSync(input.password, user.password);
    if (user && isMatch) {
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
