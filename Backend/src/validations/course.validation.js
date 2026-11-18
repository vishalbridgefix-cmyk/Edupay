  import Joi from "joi";

  // Common Course Fields
  const courseFields = {
      title: Joi.string()
          .trim()
          .min(3)
          .max(100)
          .messages({
              "string.empty": "Course title is required",
              "string.min": "Course title must be at least 3 characters",
              "string.max": "Course title cannot exceed 100 characters",
          }),

      description: Joi.string()
          .trim()
          .min(10)
          .max(2000)
          .messages({
              "string.empty": "Course description is required",
              "string.min": "Description must be at least 10 characters",
              "string.max": "Description cannot exceed 2000 characters",
          }),

      thumbnail: Joi.string().allow(""),

      category: Joi.string()
          .trim()
          .min(1)
          .messages({
              "string.empty": "Course category is required",
          }),

      difficultyLevel: Joi.string()
          .valid("Beginner", "Intermediate", "Advanced")
          .messages({
              "any.only": "Difficulty must be Beginner, Intermediate, or Advanced",
          }),

      duration: Joi.number()
          .positive()
          .messages({
              "number.base": "Duration must be a number",
              "number.positive": "Duration must be greater than zero",
          }),

      price: Joi.number()
          .min(0)
          .messages({
              "number.base": "Price must be a number",
              "number.min": "Price cannot be negative",
          }),

      requirements: Joi.array()
          .items(Joi.string().trim()),

      learningOutcomes: Joi.array()
          .items(Joi.string().trim()),

      lessons: Joi.array()
          .items(Joi.string().hex().length(24)),

      status: Joi.string()
          .valid("Draft", "Published"),
  };

  // Create Course Schema
  const courseSchema = Joi.object({
      ...courseFields,

      title: courseFields.title.required().messages({
          "any.required": "Course title is required",
      }),

      description: courseFields.description.required().messages({
          "any.required": "Course description is required",
      }),

      category: courseFields.category.required().messages({
          "any.required": "Course category is required",
      }),

      difficultyLevel: courseFields.difficultyLevel.required().messages({
          "any.required": "Difficulty level is required",
      }),

      duration: courseFields.duration.required().messages({
          "any.required": "Course duration is required",
      }),

      price: courseFields.price.required().messages({
          "any.required": "Course price is required",
      }),

      status: Joi.forbidden(),
  });

  // Update Course Schema
  const updateCourseSchema = Joi.object({
    ...courseFields,
    status: Joi.forbidden()
  })
      .min(1)
      .messages({
          "object.min": "At least one field is required for update",
      });

  // Validation Middleware
  const validateData = (schema) => {
      return (req, res, next) => {
          const { error, value } = schema.validate(req.body, {
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
  };

  // Export Middlewares
  export const validateCourse = validateData(courseSchema);

  export const validateUpdateCourse = validateData(updateCourseSchema);
