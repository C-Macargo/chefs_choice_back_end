import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/create-category-dto';
import { UpdateCategoryDto } from 'src/dtos/update-category-dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipes';
import { createCategorySchema } from 'src/schemas/create-category-schema';
import { CategoryService } from 'src/services/category.service';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved categories' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'ID of the category to retrieve', type: String })
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Get products for a specific category by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved products in the category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'ID of the category to retrieve products from', type: String })
  async findProductsByCategoryId(@Param('id') id: string) {
    return await this.categoryService.findCategoryWithProducts(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category successfully created' })
  @ApiResponse({ status: 404, description: 'No current menu found' })
  @ApiResponse({ status: 409, description: 'Category already exists' })
  @ApiBody({ type: CreateCategoryDto, description: 'Category data' })
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({ status: 200, description: 'Category successfully updated' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'ID of the category to update', type: String })
  @ApiBody({ type: UpdateCategoryDto, description: 'Updated category data' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 200, description: 'Category successfully deleted' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'ID of the category to delete', type: String })
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
