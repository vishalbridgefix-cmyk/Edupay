
import Joi from "joi";
import { validationMessages } from "../constants/messages.js";

// ASSIGNMENT VALIDATION SCHEMA
const assignmentSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": validationMessages.ASSIGNMENT_TITLE_REQUIRED,
      "string.min": validationMessages.ASSIGNMENT_TITLE_MIN,
      "string.max": validationMessages.ASSIGNMENT_TITLE_MAX,
      "string.base": validationMessages.ASSIGNMENT_TITLE_INVALID,
      "any.required": validationMessages.ASSIGNMENT_TITLE_REQUIRED,
    }),

  instruction: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": validationMessages.ASSIGNMENT_INSTRUCTIONS_REQUIRED,
      "string.base": validationMessages.ASSIGNMENT_INSTRUCTIONS_INVALID,
      "any.required": validationMessages.ASSIGNMENT_INSTRUCTIONS_REQUIRED,
    }),

  url: Joi.when("format", {
    is: "video",
    then: Joi.string()
      .trim()
      .uri()
      .required()
      .messages({
        "string.empty": validationMessages.ASSIGNMENT_URL_REQUIRED,
        "string.uri": validationMessages.ASSIGNMENT_URL_INVALID,
        "string.base": validationMessages.ASSIGNMENT_URL_INVALID,
        "any.required": validationMessages.ASSIGNMENT_URL_REQUIRED,
      }),
    otherwise: Joi.string()
      .trim()
      .uri()
      .allow("", null)
      .optional()
      .messages({
        "string.uri": validationMessages.ASSIGNMENT_URL_INVALID,
        "string.base": validationMessages.ASSIGNMENT_URL_INVALID,
      }),
  }),

  format: Joi.string()
    .valid("video", "github", "pdf", "ppt")
    .required()
    .messages({
      "any.only": validationMessages.ASSIGNMENT_FORMAT_INVALID,
      "any.required": validationMessages.ASSIGNMENT_FORMAT_REQUIRED,
      "string.base": validationMessages.ASSIGNMENT_FORMAT_INVALID,
    }),

  duration: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": validationMessages.ASSIGNMENT_DURATION_INVALID,
      "number.min": validationMessages.ASSIGNMENT_DURATION_INVALID,
      "any.required": validationMessages.ASSIGNMENT_DURATION_INVALID,
    }),

  level: Joi.string()
    .valid("easy", "medium", "hard")
    .required()
    .messages({
      "any.only": validationMessages.ASSIGNMENT_LEVEL_INVALID,
      "any.required": validationMessages.ASSIGNMENT_LEVEL_REQUIRED,
      "string.base": validationMessages.ASSIGNMENT_LEVEL_INVALID,
    }),

  totalMarks: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": validationMessages.ASSIGNMENT_TOTAL_MARKS_INVALID,
      "number.min": validationMessages.ASSIGNMENT_TOTAL_MARKS_MIN,
      "any.required": validationMessages.ASSIGNMENT_TOTAL_MARKS_REQUIRED,
    }),

  passingMarks: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": validationMessages.ASSIGNMENT_PASSING_MARKS_INVALID,
      "number.min": validationMessages.ASSIGNMENT_PASSING_MARKS_NEGATIVE,
      "any.required": validationMessages.FIELD_REQUIRED,
    }),

  status: Joi.string()
    .valid("draft", "publish")
    .default("draft")
    .messages({
      "any.only": validationMessages.ASSIGNMENT_STATUS_INVALID,
      "string.base": validationMessages.ASSIGNMENT_STATUS_INVALID,
    }),

  deadline: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": validationMessages.ASSIGNMENT_DEADLINE_INVALID,
      "date.format": validationMessages.ASSIGNMENT_DEADLINE_INVALID,
      "any.required": validationMessages.ASSIGNMENT_DEADLINE_INVALID,
    }),
})
.custom((value, helpers) => {
  if (
    value.totalMarks !== undefined &&
    value.passingMarks !== undefined &&
    value.passingMarks > value.totalMarks
  ) {
    return helpers.error("assignment.marks");
  }

  return value;
})
.messages({
  "assignment.marks":
    validationMessages.ASSIGNMENT_PASSING_MARKS_EXCEEDED,
})
.unknown(false);


// VALIDATE CREATE ASSIGNMENT
export const validateCreateAssignment = (req, res, next) => {
  const { error, value } = assignmentSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;

  next();
};


// UPDATE ASSIGNMENT VALIDATION
export const validateUpdateAssignment = (req, res, next) => {
  const updateSchema = assignmentSchema
    .fork(
      [
        "title",
        "instruction",
        "url",
        "format",
        "duration",
        "level",
        "totalMarks",
        "passingMarks",
        "status",
        "deadline",
      ],
      (schema) => schema.optional()
    )
    .custom((value, helpers) => {
      if (
        value.totalMarks !== undefined &&
        value.passingMarks !== undefined &&
        value.passingMarks > value.totalMarks
      ) {
        return helpers.error("assignment.marks");
      }

      return value;
    })
    .messages({
      "assignment.marks":
        validationMessages.ASSIGNMENT_PASSING_MARKS_EXCEEDED,
    })
    .min(1)
    .messages({
      "object.min": validationMessages.ASSIGNMENT_UPDATE_FIELDS_REQUIRED,
    });

  const { error, value } = updateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;

  next();
};
