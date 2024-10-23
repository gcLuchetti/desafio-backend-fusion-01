import { IsNotEmpty } from 'class-validator';
import { SignInAuthDto } from './sign-in-auth.dto';
import { OmitType } from '@nestjs/swagger';

export class ResultAuthDto extends OmitType(SignInAuthDto, [
  'userId',
] as const) {
  @IsNotEmpty()
  accessToken: string;
}
