/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Body,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    HttpStatus,
    ParseFilePipe,
    MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './categoryDto/category.dto';
import { UpdateCategoryDto } from './categoryDto/updatecategory.dto';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    // CREATE with image upload
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/categories',
                filename: (_, file, cb) => {
                    const uniqueName =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
        }),
    )
    create(
        @Body() dto: CategoryDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1 * 1024 * 1024, // 1 MB
                        message: 'File size must be less than 1 MB',
                    }),
                ],
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.categoriesService.create({
            ...dto,
            category_image_url: file?.path,
        });
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    // UPDATE with optional image
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/categories',
                filename: (_, file, cb) => {
                    const uniqueName =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
        }),
    )
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCategoryDto,
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired:false,
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1 * 1024 * 1024, // 1 MB
                        message: 'File size must be less than 1 MB',
                    }),
                ],
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
        ) file?: Express.Multer.File,
    ) {
        return this.categoriesService.update(id, {
            ...dto,
            ...(file && { category_image_url: file.path }),
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
