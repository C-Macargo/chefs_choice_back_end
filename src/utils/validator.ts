import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

export async function validateCategoryExists(prisma: PrismaService, categoryId: number): Promise<void> {
  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!existingCategory) {
    throw new NotFoundException(`Category with ID ${categoryId} not found`);
  }
}

export async function validateMenuExists(prisma: PrismaService, menuId: number): Promise<void> {
  const existingMenu = await prisma.menu.findUnique({
    where: { id: menuId },
  });

  if (!existingMenu) {
    throw new NotFoundException(`Menu with ID ${menuId} not found`);
  }
}
