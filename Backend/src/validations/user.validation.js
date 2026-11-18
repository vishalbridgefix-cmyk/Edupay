
import Joi from "joi";
export const registerSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .max(30)
    .required(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  role: Joi.string()
    .valid("learner", "instructor", "admin")
    .default("learner"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(50),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),

  role: Joi.string() 
    .valid("learner", "instructor", "admin"),
});