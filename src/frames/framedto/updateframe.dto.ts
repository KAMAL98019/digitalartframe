/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsString, IsNumberString, IsOptional } from 'class-validator';

export class UpdateFrameDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    frame_name: string;

    // Since your entity defines price as string, IsNumberString allows "100" but rejects "abc"
    @IsOptional()
    @IsNumberString()
    @IsNotEmpty()
    frame_price: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    frame_desc: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    frame_image: string;

    @IsOptional()
    @IsNotEmpty()
    category_id: string;
}