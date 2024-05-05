import { Module } from '@nestjs/common';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { PrismaModule } from './modules/prisma.module';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [PrismaModule],
  controllers: [MenuController, CategoryController, ProductController],
  providers: [MenuService, CategoryService, ProductService],
})
export class AppModule {}
