import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/create-product-dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipes';
import { createProductSchema } from 'src/schemas/create-product-schema';
import { ProductService } from 'src/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createProductSchema))
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }
}
