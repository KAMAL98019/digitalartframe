import { ForbiddenException, Injectable } from '@nestjs/common';
import { AdminUserService } from './adminuser.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { adminAuthDto } from './adminAuthDto/adminauth.dto';
import { adminDto } from './adminDto/admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: adminDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.adminUserService.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      success: true,
      message: 'Admin registered successfully',
    };
  }

  async login(dto: adminAuthDto) {
    const user = await this.adminUserService.findByEmail(dto.email);

    if (!user) {
      throw new ForbiddenException({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const payload = { email: user.email, sub: user.id };

    return {
      success: true,
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }
}
