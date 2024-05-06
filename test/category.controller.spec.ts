import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from 'src/controllers/category.controller';
import { CategoryService } from 'src/services/category.service';
import { CreateCategoryDto } from 'src/dtos/create-category-dto';
import { UpdateCategoryDto } from 'src/dtos/update-category-dto';
import { faker } from '@faker-js/faker';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
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

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should return all categories', async () => {
    const categories = Array.from({ length: 3 }, (_, index) => ({
      id: index + 1,
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
    }));

    jest.spyOn(service, 'findAll').mockResolvedValue(categories);

    const result = await controller.findAll();
    expect(result).toEqual(categories);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a specific category by id', async () => {
    const categoryId = faker.string.numeric();
    const categoryData = { id: parseInt(categoryId), name: faker.commerce.department(), description: faker.lorem.sentence() };

    jest.spyOn(service, 'findOne').mockResolvedValue(categoryData);

    const result = await controller.findOne(categoryId);
    expect(result).toEqual(categoryData);
    expect(service.findOne).toHaveBeenCalledWith(categoryId);
  });

  it('should return products related to a category by category id', async () => {
    const categoryId = parseInt(faker.string.uuid()).toString();
    const products = [{ id: faker.string.uuid(), name: faker.commerce.productName(), price: faker.commerce.price() }];

    jest.spyOn(service, 'findCategoryWithProducts').mockResolvedValue({ id: categoryId, products } as any);

    const result = await controller.findProductsByCategoryId(categoryId);
    expect(result).toEqual({ id: categoryId, products });
    expect(service.findCategoryWithProducts).toHaveBeenCalledWith(categoryId);
  });

  it('should create a new category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: faker.commerce.department(),
      productIds: [],
    };
    const createdCategory = { id: faker.number.int(), ...createCategoryDto };

    jest.spyOn(service, 'create').mockResolvedValue(createdCategory);

    const result = await controller.create(createCategoryDto);
    expect(result).toEqual(createdCategory);
    expect(service.create).toHaveBeenCalledWith(createCategoryDto);
  });

  it('should update an existing category by id', async () => {
    const categoryId = parseInt(faker.string.uuid()).toString();
    const updateCategoryDto: UpdateCategoryDto = {
      name: faker.commerce.department(),
      productIds: [],
    };
    const updatedCategory = { id: Number(categoryId), ...updateCategoryDto };

    jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);

    const result = await controller.update(categoryId, updateCategoryDto);
    expect(result).toEqual(updatedCategory);
    expect(service.update).toHaveBeenCalledWith(categoryId, updateCategoryDto);
  });

  it('should delete a category by id', async () => {
    const categoryId = parseInt(faker.string.numeric(1)).toString();
    jest.spyOn(service, 'delete').mockResolvedValue({ id: parseInt(categoryId), name: faker.commerce.department() });
    const result = await controller.delete(categoryId);
    expect(result).toEqual({ id: Number(categoryId), name: expect.any(String) });
    expect(service.delete).toHaveBeenCalledWith(categoryId);
  });
});
