import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateProductDto } from 'src/dtos/create-product-dto';
import { validateCategoryExists, validateMenuExists } from 'src/utils/validator';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const productId = parseInt(id, 10);
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
    const productId = parseInt(id, 10);
    const existingProduct = await this.prisma.product.findUnique({ where: { id: productId } });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.categoryId) {
      await validateCategoryExists(this.prisma, updateProductDto.categoryId);
    }

    if (updateProductDto.menuId) {
      await validateMenuExists(this.prisma, updateProductDto.menuId);
    }
    return await this.prisma.product.update({
      where: { id: productId },
      data: {
        name: updateProductDto.name || existingProduct.name,
        description: updateProductDto.description || existingProduct.description,
        price: updateProductDto.price ?? existingProduct.price,
        image_url: updateProductDto.imageUrl || existingProduct.image_url,
        menu: updateProductDto.menuId ? { connect: { id: updateProductDto.menuId } } : undefined,
        category: updateProductDto.categoryId ? { connect: { id: updateProductDto.categoryId } } : undefined,
      },
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await validateCategoryExists(this.prisma, createProductDto.categoryId);

    if (createProductDto.menuId) {
      await validateMenuExists(this.prisma, createProductDto.menuId);
    }

    return await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        image_url: createProductDto.imageUrl,
        menu: createProductDto.menuId ? { connect: { id: createProductDto.menuId } } : undefined,
        category: { connect: { id: createProductDto.categoryId } },
      },
    });
  }
}
