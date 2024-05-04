import { Module } from '@nestjs/common';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { PrismaModule } from './modules/prisma.module';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [PrismaModule],
  controllers: [MenuController, CategoryController],
  providers: [MenuService, CategoryService],
})
export class AppModule {}
