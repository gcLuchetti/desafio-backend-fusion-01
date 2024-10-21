import { IsEmail, IsNotEmpty } from 'class-validator';

export class InputAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
