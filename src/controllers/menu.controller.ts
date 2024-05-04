import { Controller, Get, Param } from '@nestjs/common';
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
}
