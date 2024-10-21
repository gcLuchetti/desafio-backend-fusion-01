import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InputAuthDto } from './dto/input-auth.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { ResultAuthDto } from './dto/result-auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async authenticate(input: InputAuthDto): Promise<ResultAuthDto> {
    const user: SignInAuthDto = await this.validateUser(input);

    if (!user) throw new UnauthorizedException();

    const authenticatedUser: ResultAuthDto = {
      accessToken: 'fake-access',
      userId: user.userId,
      email: user.email,
    };

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
}
