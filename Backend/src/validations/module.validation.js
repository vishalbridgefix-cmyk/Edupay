import Joi from "joi";
import { validationMessages } from "../constants/messages.js";
import { HttpStatusCode } from "../constants/httpStatus.js";

// Common Module Fields
const moduleFields = {
  title: Joi.string().trim().min(3).max(120).messages({
    "string.empty": validationMessages.MODULE_TITLE_REQUIRED,
    "string.min": validationMessages.MODULE_TITLE_MIN,
    "string.max": validationMessages.MODULE_TITLE_MAX,
    "string.base": validationMessages.MODULE_TITLE_INVALID,
  }),

  description: Joi.string().trim().allow("").max(500).messages({
    "string.max": validationMessages.MODULE_DESCRIPTION_MAX,
    "string.base": validationMessages.MODULE_DESCRIPTION_INVALID,
  }),
};

// Create Module Schema
const createModuleSchema = Joi.object({
  title: moduleFields.title.required().messages({
    "any.required": validationMessages.MODULE_TITLE_REQUIRED,
  }),

  description: moduleFields.description,
});

// Update Module Schema
const updateModuleSchema = Joi.object({
  ...moduleFields,
})
  .min(1)
  .messages({
    "object.min": validationMessages.MODULE_UPDATE_FIELD_REQUIRED,
  });

// Validation Middleware
const validateData = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: validationMessages.MODULE_VALIDATION_FAILED,
        errors: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    next();
  };
};

export const validateModule = validateData(createModuleSchema);

export const validateUpdateModule = validateData(updateModuleSchema);
