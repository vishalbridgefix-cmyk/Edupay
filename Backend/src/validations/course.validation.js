import Joi from "joi";

// Course validation schema
const courseSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Course title is required",
      "string.min": "Course title must be at least 3 characters",
      "string.max": "Course title cannot exceed 100 characters",
      "any.required": "Course title is required",
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      "string.empty": "Course description is required",
      "string.min": "Description must be at least 10 characters",
      "string.max": "Description cannot exceed 2000 characters",
      "any.required": "Course description is required",
    }),

  thumbnail: Joi.string()
    .allow("")
    .optional(),

  category: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Course category is required",
      "any.required": "Course category is required",
    }),

  difficultyLevel: Joi.string()
    .valid("Beginner", "Intermediate", "Advanced")
    .required()
    .messages({
      "any.only": "Difficulty must be Beginner, Intermediate, or Advanced",
      "any.required": "Difficulty level is required",
    }),

  duration: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Duration must be a number",
      "number.positive": "Duration must be greater than zero",
      "any.required": "Course duration is required",
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Course price is required",
    }),

  requirements: Joi.array()
    .items(Joi.string().trim())
    .optional(),

  learningOutcomes: Joi.array()
    .items(Joi.string().trim())
    .optional(),

  status: Joi.string()
    .valid("Draft", "Published")
    .optional(),
});

// Middleware to validate course data
export const validateCourse = (req, res, next) => {
  const { error, value } = courseSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Course validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};

module.exports = { validateCourse };