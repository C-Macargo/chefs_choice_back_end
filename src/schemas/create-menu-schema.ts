import * as Joi from 'joi';

export const createMenuSchema = Joi.object({
  name: Joi.string().required().label('Menu Name'),
  description: Joi.string().optional().allow(null).label('Description'),
  isDay: Joi.boolean().strict().required().label('Day/Night Indicator'),
  productIds: Joi.array().items(Joi.number().integer().positive().required().label('Product ID')).min(1).required().label('Product IDs'),
});
