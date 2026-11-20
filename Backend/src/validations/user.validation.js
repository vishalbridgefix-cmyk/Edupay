




import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required(),

  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required(),

  password: Joi.string()
    .min(6)
    .max(30)
    .required(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  age: Joi.number()
    .integer()
    .min(13)
    .max(100)
    .optional(),

  gender: Joi.string()
    .valid("male", "female", "other")
    .default("other"),

  address: Joi.string()
    .max(200)
    .trim()
    .allow("")
    .default(""),

  role: Joi.string()
    .valid("learner", "instructor", "admin")
    .default("learner"),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required(),

  password: Joi.string()
    .required(),
});

export const updateProfileSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(50)
    .trim(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),

  age: Joi.number()
    .integer()
    .min(13)
    .max(100),

  gender: Joi.string()
    .valid("male", "female", "other"),

  address: Joi.string()
    .max(200)
    .trim()
    .allow(""),

  role: Joi.string()
    .valid("learner", "instructor", "admin"),
});
