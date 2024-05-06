import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from 'src/controllers/menu.controller';
import { MenuService } from 'src/services/menu.service';

describe('MenuController', () => {
  let controller: MenuController;
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [
        {
          provide: MenuService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            findCategoryWithProducts: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MenuController>(MenuController);
    service = module.get<MenuService>(MenuService);
  });

  it('should return a specific menu by id including products', async () => {
    const menuId = faker.string.numeric();
    const menuData = {
      id: parseInt(menuId),
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      isDay: true,
      products: [
        { id: 1, name: faker.commerce.productName() },
        { id: 2, name: faker.commerce.productName() },
      ],
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(menuData);
    const result = await controller.findOne(menuId.toString());
    expect(result).toEqual(menuData);
    expect(service.findOne).toHaveBeenCalledWith(menuId);
  });

  it('should return all menus', async () => {
    const menus = Array.from({ length: 2 }, (_, index) => ({
      id: index + 1,
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      isDay: true,
    }));
    jest.spyOn(service, 'findAll').mockResolvedValue(menus);
    const result = await controller.findAll();
    expect(result).toEqual(menus);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a new menu', async () => {
    const menuData = {
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      isDay: true,
      productId: [1, 2],
    };
    jest.spyOn(service, 'create').mockResolvedValue(menuData);
    const result = await controller.create(menuData);
    expect(result).toEqual(menuData);
    expect(service.create).toHaveBeenCalledWith(menuData);
  });
  it('should update a menu', async () => {
    const menuId = faker.string.numeric();
    const menuData = {
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      isDay: true,
      productId: [1, 2],
    };
    jest.spyOn(service, 'update').mockResolvedValue(menuData);
    const result = await controller.update(menuId, menuData);
    expect(result).toEqual(menuData);
    expect(service.update).toHaveBeenCalledWith(menuId, menuData);
  });
});
