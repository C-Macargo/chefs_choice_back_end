import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
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
}
