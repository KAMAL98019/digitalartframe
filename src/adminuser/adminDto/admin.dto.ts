/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class adminDto {
    @IsOptional()
    @IsString()
    id: string

    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsString()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Phonenumber is required' })
    @IsString()
    phonenumber: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @IsString()
    password: string;
}
