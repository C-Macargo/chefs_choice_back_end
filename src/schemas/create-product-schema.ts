import * as Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().precision(2).positive().required(),
  imageUrl: Joi.string().allow('').optional(),
  menuId: Joi.number().integer().allow(null).optional(),
  categoryId: Joi.number().integer().required(),
});
