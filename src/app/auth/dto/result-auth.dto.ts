import { IsNotEmpty } from 'class-validator';
import { SignInAuthDto } from './sign-in-auth.dto';

export class ResultAuthDto extends SignInAuthDto {
  @IsNotEmpty()
  accessToken: string;
}
