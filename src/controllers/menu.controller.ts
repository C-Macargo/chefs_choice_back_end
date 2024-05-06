import { Controller, Get, Param, Post, Body, UsePipes, Put, Delete } from '@nestjs/common';
import { CreateMenuDto } from 'src/dtos/create-menu-dto';
import { UpdateMenuDto } from 'src/dtos/update-menu-dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipes';
import { createMenuSchema } from 'src/schemas/create-menu-schema';
import { MenuService } from 'src/services/menu.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all menus' })
  async findAll() {
    return await this.menuService.findAll();
  }

  @Get('/now')
  @ApiOperation({ summary: 'Get the current menu (day or night)' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the current menu' })
  @ApiResponse({ status: 404, description: 'No current menu found' })
  async findCurrentMenu() {
    return await this.menuService.findCurrentMenu();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific menu by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the menu' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  @ApiParam({ name: 'id', description: 'ID of the menu to retrieve', type: String })
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({ status: 201, description: 'Menu successfully created' })
  @ApiResponse({ status: 409, description: 'menu already exists' })
  @ApiBody({ type: CreateMenuDto, description: 'Menu data to create' })
  @UsePipes(new JoiValidationPipe(createMenuSchema))
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu successfully updated' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  @ApiParam({ name: 'id', description: 'ID of the menu to update', type: String })
  @ApiBody({ type: UpdateMenuDto, description: 'Updated menu data' })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu successfully deleted' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  @ApiParam({ name: 'id', description: 'ID of the menu to delete', type: String })
  async delete(@Param('id') id: string) {
    return await this.menuService.delete(id);
  }
}
