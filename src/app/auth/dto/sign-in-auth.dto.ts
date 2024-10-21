import { OmitType } from '@nestjs/mapped-types';
import { InputAuthDto } from './input-auth.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SignInAuthDto extends OmitType(InputAuthDto, [
  'password',
] as const) {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
