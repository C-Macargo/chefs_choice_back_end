import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string): Promise<Category> {
    const categoryId = parseInt(id, 10);
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    const category = await this.findOne(id);
    return this.prisma.category.update({
      where: { id: category.id },
      data,
    });
  }

  async delete(id: string): Promise<Category> {
    const category = await this.findOne(id); //
    return this.prisma.category.delete({
      where: { id: category.id },
    });
  }

  async findCategoryWithProducts(id: string): Promise<Category> {
    const categoryId = parseInt(id, 10);

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return category;
  }
}
