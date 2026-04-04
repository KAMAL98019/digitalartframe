/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsString, IsUUID, IsNumberString, IsUrl, IsOptional } from 'class-validator';

export class CreateFrameDto {
    @IsString()
    @IsNotEmpty()
    frame_name: string;

    // Since your entity defines price as string, IsNumberString allows "100" but rejects "abc"
    @IsNumberString()
    @IsNotEmpty()
    frame_price: string;

    @IsString()
    @IsNotEmpty()
    frame_desc: string;

    @IsOptional()
    @IsString()
    frame_image: string;

    @IsUUID()
    category_id: string;
}