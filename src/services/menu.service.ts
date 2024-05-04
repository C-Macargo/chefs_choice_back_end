import { Injectable } from '@nestjs/common';
import { Menu } from '@prisma/client';
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
}
