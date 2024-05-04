import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      throw new BadRequestException('Validation failed: ' + validationErrors.join(', '));
    }
    return value;
  }
}
