import { Controller, Get, Param, Post, Body, UsePipes, Put, Delete } from '@nestjs/common';
import { CreateMenuDto } from 'src/dtos/create-menu-dto';
import { UpdateMenuDto } from 'src/dtos/update-menu-dto';
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

  @Get('/now')
  async findCurrentMenu() {
    return await this.menuService.findCurrentMenu();
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.menuService.delete(id);
  }
}
