import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { adminAuthDto } from './adminAuthDto/adminauth.dto';
import { adminDto } from './adminDto/admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: adminDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: adminAuthDto) {
    return this.authService.login(dto);
  }
}
