import { OmitType } from '@nestjs/mapped-types';
import { InputAuthDto } from './input-auth.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class SignInAuthDto extends OmitType(InputAuthDto, [
  'password',
] as const) {
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
