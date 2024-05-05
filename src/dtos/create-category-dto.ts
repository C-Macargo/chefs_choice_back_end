export class CreateCategoryDto {
  name: string;
  productIds: number[];

  constructor(name: string, productIds: number[]) {
    this.name = name;
    this.productIds = productIds;
  }
}
