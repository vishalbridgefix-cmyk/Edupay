




import Joi from "joi";

export const registerSchema = Joi.object({

  fullName: Joi.string()
    .min(2)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  phone: Joi.string()
    .required(),

  age: Joi.number()
    .min(13)
    .max(100)
    .optional(),

  gender: Joi.string()
    .valid("male", "female", "other")
    .optional(),

  address: Joi.string()
    .allow("")
    .optional(),

  role: Joi.string()
    .valid("learner", "instructor", "admin")
    .optional(),

  // ADD THIS FIELD
  profileImage: Joi.string()
    .uri()
    .allow("")
    .optional(),

});

export const loginSchema = Joi.object({

  email: Joi.string()
    .email()
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
