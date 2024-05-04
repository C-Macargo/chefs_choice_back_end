import { Controller, Get, Param, Post, Body, UsePipes } from '@nestjs/common';
import { CreateMenuDto } from 'src/dtos/create-menu.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipes';
import { createMenuSchema } from 'src/schemas/create-menu-schema';
import { MenuService } from 'src/services/menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll() {
    return await this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createMenuSchema))
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }
}
