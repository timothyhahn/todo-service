import * as Joi from 'joi';

export const createTodoModel = Joi.object().keys({
  description: Joi.string().required()
});

export const updateTodoModel = Joi.object().keys({
  description: Joi.string(),
  isComplete: Joi.boolean()
});
