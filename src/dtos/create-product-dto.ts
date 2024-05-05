export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  menuId?: number;
  categoryId: number;

  // eslint-disable-next-line max-len
  constructor(name: string, price: number, categoryId: number, description?: string, imageUrl?: string, menuId?: number) {
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
    this.description = description;
    this.imageUrl = imageUrl;
    this.menuId = menuId;
  }
}
