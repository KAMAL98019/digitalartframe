/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminUserService } from './adminuser.service';
import { UuidParamDto } from './adminDto/uuidparam.dto';
import { adminUpdateDto } from './adminDto/adminupdate.dto';

@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class AdminUserOperations {
  constructor(private readonly adminservice: AdminUserService) {}

  @Get()
  getAllUsers() {
    return this.adminservice.getAllAdminUser();
  }
  @Get(':id')
  getById(@Param() params: UuidParamDto) {
    return this.adminservice.getById(params.id);
  }

  @Put(':id')
  update(@Param() params: UuidParamDto, @Body() body: adminUpdateDto) {
    return this.adminservice.adminUserUpdate(params.id, body);
  }

  @Delete(':id')
  delete(@Param() params: UuidParamDto) {
    return this.adminservice.adminUserDelete(params.id);
  }
}
