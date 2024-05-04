import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { CategoryController } from 'src/controllers/category.controller';
import { CategoryService } from 'src/services/category.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
