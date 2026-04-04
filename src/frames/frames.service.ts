/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Frames } from './frames.entity';
import { Categories } from 'src/categories/category.entity';
import { CreateFrameDto } from './framedto/frame.dto';
import { UpdateFrameDto } from './framedto/updateframe.dto';

@Injectable()
export class FramesService {
  constructor(
    @InjectRepository(Frames)
    private readonly framesRepository: Repository<Frames>,

    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  // ================= CREATE =================
  async create(createFrameDto: CreateFrameDto, imagePath?: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id: createFrameDto.category_id },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createFrameDto.category_id} not found`,
      );
    }

    const frame = this.framesRepository.create({
      frame_name: createFrameDto.frame_name,
      frame_price: createFrameDto.frame_price,
      frame_desc: createFrameDto.frame_desc,
      frame_image: imagePath ?? createFrameDto.frame_image,
      category,
    });

    const savedFrame = await this.framesRepository.save(frame);

    return {
      success: true,
      message: 'Frame created successfully',
      data: savedFrame,
    };
  }

  // ================= FIND ALL =================
  async findAll() {
    const frames = await this.framesRepository.find({
      relations: ['category'],
    });

    return {
      success: true,
      count: frames.length,
      data: frames,
    };
  }

  // ================= FIND ONE =================
  async findOne(id: string) {
    const frame = await this.framesRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!frame) {
      throw new NotFoundException(`Frame with ID ${id} not found`);
    }

    return {
      success: true,
      data: frame,
    };
  }

  // ================= UPDATE =================
  async update(id: string, updateFrameDto: UpdateFrameDto, imagePath?: string) {
    const frame = await this.framesRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!frame) {
      throw new NotFoundException(`Frame with ID ${id} not found`);
    }

    // Update category if provided
    if (updateFrameDto.category_id) {
      const category = await this.categoriesRepository.findOne({
        where: { id: updateFrameDto.category_id },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      frame.category = category;
    }

    // Update other fields safely
    frame.frame_name = updateFrameDto.frame_name ?? frame.frame_name;
    frame.frame_price = updateFrameDto.frame_price ?? frame.frame_price;
    frame.frame_desc = updateFrameDto.frame_desc ?? frame.frame_desc;
    frame.frame_image =
      imagePath ?? updateFrameDto.frame_image ?? frame.frame_image;

    const updatedFrame = await this.framesRepository.save(frame);

    return {
      success: true,
      message: 'Frame updated successfully',
      data: updatedFrame,
    };
  }

  // ================= DELETE =================
  async remove(id: string) {
    const frame = await this.framesRepository.findOne({ where: { id } });

    if (!frame) {
      throw new NotFoundException(`Frame with ID ${id} not found`);
    }

    await this.framesRepository.delete(id);

    return {
      success: true,
      message: 'Frame deleted successfully',
    };
  }
}
