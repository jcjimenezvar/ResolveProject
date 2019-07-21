import joi from "joi";

export const resolveStudioSchema = joi
  .object()
  .keys({
    neighbourhood: joi.string().required()
  })
  .required();
