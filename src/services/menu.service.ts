import { Injectable } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findOne(id: string): Promise<Menu | null> {
    const menuId = parseInt(id, 10);
    return this.prisma.menu.findUnique({
      where: { id: menuId },
    });
  }

  async create(data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.prisma.menu.create({
      data,
    });
  }

  async update(id: string, data: Prisma.MenuUpdateInput): Promise<Menu> {
    const menuId = parseInt(id, 10);
    return this.prisma.menu.update({
      where: { id: menuId },
      data,
    });
  }
}
