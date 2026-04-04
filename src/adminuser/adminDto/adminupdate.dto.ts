/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class adminUpdateDto {

    @IsOptional()
    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    username: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Email is required' })
    @IsString()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    
    @IsOptional()
    @IsString()
    phonenumber: string;

}
