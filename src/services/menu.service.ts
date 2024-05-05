import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findOne(id: string): Promise<Menu> {
    const menuId = parseInt(id, 10);
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async create(data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.prisma.menu.create({
      data,
    });
  }

  async update(id: string, data: Prisma.MenuUpdateInput): Promise<Menu> {
    const menu = await this.findOne(id);
    return this.prisma.menu.update({
      where: { id: menu.id },
      data,
    });
  }

  async delete(id: string): Promise<Menu> {
    const menu = await this.findOne(id);
    return this.prisma.menu.delete({
      where: { id: menu.id },
    });
  }
}
