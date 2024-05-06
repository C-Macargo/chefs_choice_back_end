import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
      include: {
        products: true,
      },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async findCurrentMenu() {
    const currentHour = new Date().getHours();
    const isDay = currentHour >= 8 && currentHour < 18;
    const currentMenu = await this.prisma.menu.findFirst({
      where: { isDay: isDay },
      include: { products: true },
    });
    if (!currentMenu) {
      throw new ConflictException(`No menu available for ${isDay ? 'daytime' : 'nighttime'}.`);
    }
    return currentMenu;
  }

  async create(data: { name: string; description?: string; isDay: boolean; productIds: number[] }): Promise<Menu> {
    const existingMenu = await this.prisma.menu.findUnique({
      where: { isDay: data.isDay },
    });

    if (existingMenu) {
      throw new ConflictException(`Menu for ${data.isDay ? 'daytime' : 'nighttime'} already exists.`);
    }
    const existingProducts = await this.prisma.product.findMany({
      where: { id: { in: data.productIds } },
      select: { id: true },
    });

    const existingProductIds = new Set(existingProducts.map((product) => product.id));

    const missingProductIds = data.productIds.filter((id) => !existingProductIds.has(id));

    if (missingProductIds.length > 0) {
      throw new NotFoundException(`The following product IDs do not exist: ${missingProductIds.join(', ')}`);
    }
    return this.prisma.menu.create({
      data: {
        name: data.name,
        description: data.description,
        isDay: data.isDay,
        products: {
          connect: data.productIds.map((id) => ({ id })),
        },
      },
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
