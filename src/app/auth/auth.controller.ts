import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InputAuthDto } from './dto/input-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Authenticates a user and generates an access token.',
  })
  create(@Body() inputAuthDto: InputAuthDto) {
    return this.authService.authenticate(inputAuthDto);
  }
}
