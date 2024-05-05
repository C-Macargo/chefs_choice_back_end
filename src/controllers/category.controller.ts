import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/create-category-dto';
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
  async create(@Body() createMenuDto: CreateCategoryDto) {
    return await this.categoryService.create(createMenuDto);
  }
}
