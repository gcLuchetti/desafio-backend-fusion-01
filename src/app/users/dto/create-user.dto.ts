import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../helpers/regex.helper';
import { MessageHelper } from '../helpers/message.helper';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessageHelper.validPassword })
  @ApiProperty()
  password: string;
}
