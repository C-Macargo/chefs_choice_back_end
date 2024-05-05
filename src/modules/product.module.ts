import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/services/product.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
