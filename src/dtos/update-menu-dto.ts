export class UpdateMenuDto {
  name?: string;
  description?: string;
  isDay?: boolean;
  productIds?: number[];

  constructor(name?: string, description?: string, isDay?: boolean, productIds?: number[]) {
    this.name = name;
    this.description = description;
    this.isDay = isDay;
    this.productIds = productIds;
  }
}
