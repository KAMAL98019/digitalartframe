/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Controller, Get, Post, Body, Patch, Param, Delete,
    UseInterceptors, UploadedFile, BadRequestException,
    ParseFilePipe,
    MaxFileSizeValidator,
    HttpStatus,
    UseGuards,
    Optional
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FramesService } from './frames.service';
import { CreateFrameDto } from './framedto/frame.dto';
import { UpdateFrameDto } from './framedto/updateframe.dto';
import { JwtStrategy } from 'src/adminuser/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

// --- File Upload Configuration ---
const storageConfig = diskStorage({
    destination: './uploads/frames',
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `frame-${uniqueSuffix}${ext}`);
    },
});

@UseGuards(AuthGuard('jwt'))
@Controller('frames')
export class FramesController {
    constructor(private readonly framesService: FramesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('frame_image', { storage: storageConfig }))
    create(
        @Body() createFrameDto: CreateFrameDto,
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
        ) file: Express.Multer.File,
    ) {
        // FIX: Change 'null' to 'undefined' to match service signature
        const imagePath = file ? file.path : undefined;
        return this.framesService.create(createFrameDto, imagePath);
    }

    @Get()
    findAll() {
        return this.framesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.framesService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('frame_image', { storage: storageConfig }))
    update(
        @Param('id') id: string,
        @Body() updateFrameDto: UpdateFrameDto,
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired: false, // ⭐ REQUIRED FIX
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1 * 1024 * 1024, // 1 MB
                        message: 'File size must be less than 1 MB',
                    }),
                ],
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
        )
        file?: Express.Multer.File, // optional
    ) {
        const imagePath = file?.path; // undefined if no image
        return this.framesService.update(id, updateFrameDto, imagePath);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.framesService.remove(id);
    }
}