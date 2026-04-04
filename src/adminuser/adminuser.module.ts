import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adminuser } from './adminuser.entity';
import { AdminUserService } from './adminuser.service';
import { AdminUserOperations } from './adminuser.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Adminuser])], // Register Repository
  controllers: [AdminUserOperations],
  providers: [AdminUserService],
  exports: [AdminUserService], // Export to use in AuthModule
})
export class AdminuserModule {}
