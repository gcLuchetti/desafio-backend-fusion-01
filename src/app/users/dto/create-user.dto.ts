import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../helpers/regex.helper';
import { MessageHelper } from '../helpers/message.helper';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessageHelper.validPassword })
  password: string;
}
