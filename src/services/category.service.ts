import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
