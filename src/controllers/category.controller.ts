import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/create-category-dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateCategoryDto } from 'src/dtos/update-category-dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipes';
import { createCategorySchema } from 'src/schemas/create-category-schema';
import { CategoryService } from 'src/services/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() UpdateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, UpdateCategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
