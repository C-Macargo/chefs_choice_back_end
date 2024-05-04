export class CreateMenuDto {
  name: string;
  description?: string;
  isDay: boolean;
  productIds: number[];

  constructor(name: string, isDay: boolean, productIds: number[], description?: string) {
    this.name = name;
    this.description = description;
    this.isDay = isDay;
    this.productIds = productIds;
  }
}
