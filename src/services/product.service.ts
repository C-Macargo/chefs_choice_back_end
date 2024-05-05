import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateProductDto } from 'src/dtos/create-product-dto';

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

async function validateCategoryExists(prisma, categoryId: number): Promise<void> {
  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!existingCategory) {
    throw new NotFoundException(`Category with ID ${categoryId} not found`);
  }
}

async function validateMenuExists(prisma, menuId: number): Promise<void> {
  const existingMenu = await prisma.menu.findUnique({
    where: { id: menuId },
  });

  if (!existingMenu) {
    throw new NotFoundException(`Menu with ID ${menuId} not found`);
  }
}
