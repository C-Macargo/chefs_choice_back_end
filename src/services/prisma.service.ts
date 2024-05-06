import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  $connect() {
    throw new Error('Method not implemented.');
  }
  $disconnect() {
    throw new Error('Method not implemented.');
  }
  readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async onModuleDestroy() {
    await this.prismaClient.$disconnect();
  }

  get prisma() {
    return this.prismaClient;
  }

  get menu() {
    return this.prismaClient.menu;
  }
  get category() {
    return this.prismaClient.category;
  }
  get product() {
    return this.prismaClient.product;
  }
}
