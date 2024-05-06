import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/create-product-dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipes';
import { createProductSchema } from 'src/schemas/create-product-schema';
import { ProductService } from 'src/services/product.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all products' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific product by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'ID of the product to retrieve', type: String })
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @ApiResponse({ status: 409, description: 'Product already exists' })
  @ApiBody({ type: CreateProductDto, description: 'Product data to create' })
  @UsePipes(new JoiValidationPipe(createProductSchema))
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'ID of the product to update', type: String })
  @ApiBody({ type: CreateProductDto, description: 'Updated product data' })
  async update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'ID of the product to delete', type: String })
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
