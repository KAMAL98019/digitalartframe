import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './category.entity';
import { CategoryDto } from './categoryDto/category.dto';
import { UpdateCategoryDto } from './categoryDto/updatecategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async create(dto: CategoryDto) {
    const category = this.categoriesRepository.create(dto);
    const newcategory = await this.categoriesRepository.save(category);
    return { success: true, data: newcategory };
  }

  async findAll() {
    const category = await this.categoriesRepository.find();
    return { success: true, count: category.length, data: category };
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return { success: true, data: category };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);
    await this.categoriesRepository.update(id, dto);
    return { success: true, message: 'Category updated Successfully' };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.categoriesRepository.delete(id);
    return { success: true, message: 'Category deleted Successfully' };
  }
}
