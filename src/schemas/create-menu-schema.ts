import * as Joi from 'joi';

export const createMenuSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  isDay: Joi.boolean().strict().required(),
});
