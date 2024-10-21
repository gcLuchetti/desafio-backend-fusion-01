import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InputAuthDto } from './dto/input-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() inputAuthDto: InputAuthDto) {
    return this.authService.authenticate(inputAuthDto);
  }
}
