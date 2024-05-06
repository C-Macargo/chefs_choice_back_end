import { CategoryService } from 'src/services/category.service';
import { PrismaService } from 'src/services/prisma.service';
import { faker } from '@faker-js/faker';

class PrismaServiceMock {
  category = {
    update: jest.fn(),
  };
}
const categoryService = new CategoryService(new PrismaServiceMock() as unknown as PrismaService);

it('should update a category correctly', async () => {
  const mockCategory = {
    id: Number(faker.string.numeric()),
    name: faker.commerce.department(),
  };

  const updatedCategory = {
    id: mockCategory.id,
    name: faker.commerce.department(),
  };

  const updateData = {
    name: updatedCategory.name,
  };

  jest.spyOn(categoryService, 'findOne').mockResolvedValue(mockCategory);
  (categoryService['prisma'].category.update as jest.Mock).mockResolvedValue(updatedCategory);

  const result = await categoryService.update(mockCategory.id.toString(), updateData);

  expect(result).toEqual(updatedCategory);
  expect(categoryService.findOne).toHaveBeenCalledWith(mockCategory.id.toString());
  expect(categoryService['prisma'].category.update).toHaveBeenCalledWith({
    where: { id: mockCategory.id },
    data: updateData,
  });
});
