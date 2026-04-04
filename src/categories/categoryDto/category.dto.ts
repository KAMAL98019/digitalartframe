/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";


export class CategoryDto{

    @IsString()
    category_name: string;
    
  @IsOptional()
  @IsString()
  category_image_url?: string;
    
}

