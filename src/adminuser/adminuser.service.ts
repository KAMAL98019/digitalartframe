/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adminuser } from './adminuser.entity';
import { adminUpdateDto } from './adminDto/adminupdate.dto';

@Injectable()
export class AdminUserService {
    constructor(
        @InjectRepository(Adminuser)
        private readonly adminUserRepository: Repository<Adminuser>,
    ) { }

    async create(userData: Partial<Adminuser>): Promise<Adminuser> {
        const existingEmail = await this.adminUserRepository.findOne({
            where: { email: userData.email },
        });

        if (existingEmail) {
            throw new ConflictException({
                success: false,
                message: 'Email already exists',
            });
        }

        const user = this.adminUserRepository.create(userData);
        return this.adminUserRepository.save(user);
    }

    async findByEmail(email: string): Promise<Adminuser> {
        const user = await this.adminUserRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`Admin with email ${email} not found`);
        }
        return user;
    }

    async getAllAdminUser(): Promise<any> {
        const user = await this.adminUserRepository.find();
        return {
            success: true,
            data: user
        };
    }

    async getById(id: string): Promise<any> {
        const user = await this.adminUserRepository.findOne(({ where: { id } }))
        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found',
            });
        }
        return {
            success: true,
            data: user
        };
    }

    async adminUserUpdate(id: string, dto: adminUpdateDto): Promise<any> {
        const user = await this.adminUserRepository.findOne(({ where: { id } }))
        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found',
            });
        }
        Object.assign(user, dto)
        const res = await this.adminUserRepository.save(user)
        return {
            success: true,
            message: "User Update Successfully",
            data: res
        }
    }

    async adminUserDelete(id:string): Promise<any>{
        const user = await this.adminUserRepository.findOne(({ where: { id } }))
        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found',
            });
        }
        await this.adminUserRepository.delete(id)
        return {
            success: true,
            message: 'User Deleted Successfully'
        }
    }


}
