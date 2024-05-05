import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/services/product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
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

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should return a specific product by id', async () => {
    const productId = parseInt(faker.string.numeric(), 10);

    const productData = {
      id: productId,
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price()),
      image_url: faker.image.url(),
      menuId: parseInt(faker.string.numeric(), 10),
      categoryId: parseInt(faker.string.numeric(), 10),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(productData);

    const result = await controller.findOne(productId.toString());

    expect(result).toEqual(productData);
    expect(service.findOne).toHaveBeenCalledWith(productId.toString());
  });
  it('should create a new product', async () => {
    const productData = {
      id: parseInt(faker.string.numeric(), 10),
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price()),
      image_url: faker.image.url(),
      menuId: parseInt(faker.string.numeric(), 10),
      categoryId: parseInt(faker.string.numeric(), 10),
    };

    jest.spyOn(service, 'create').mockResolvedValue(productData);
    const result = await controller.create(productData);
    expect(result).toEqual(productData);
    expect(service.create).toHaveBeenCalledWith(productData);
  });
  it('should delete a specific product by id', async () => {
    const productId = parseInt(faker.string.numeric(), 10);
    jest.spyOn(service, 'delete').mockResolvedValue(true);
    const result = await controller.delete(productId.toString());
    expect(result).toEqual(true);
    expect(service.delete).toHaveBeenCalledWith(productId.toString());
  });
});
