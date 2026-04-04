/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FramesService } from './frames.service';
import { FramesController } from './frames.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frames } from './frames.entity';
import { Categories } from 'src/categories/category.entity';

@Module({
    imports: [
        // FIX: You must register BOTH entities here because your Service uses both repositories
        TypeOrmModule.forFeature([Frames, Categories]),
    ], providers: [FramesService],
    controllers: [FramesController],
})
export class FramesModule { }
