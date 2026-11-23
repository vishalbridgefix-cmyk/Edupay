import Joi from "joi";
import { validationMessages } from "../constants/messages.js";

// Common Course Fields
const courseFields = {
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .messages({
            "string.empty": validationMessages.COURSE_TITLE_REQUIRED,
            "string.min": validationMessages.COURSE_TITLE_MIN,
            "string.max": validationMessages.COURSE_TITLE_MAX,
            "string.base": validationMessages.COURSE_TITLE_INVALID,
        }),

    description: Joi.string()
        .trim()
        .min(10)
        .max(2000)
        .messages({
            "string.empty": validationMessages.COURSE_DESCRIPTION_REQUIRED,
            "string.min": validationMessages.COURSE_DESCRIPTION_MIN,
            "string.max": validationMessages.COURSE_DESCRIPTION_MAX,
            "string.base": validationMessages.COURSE_DESCRIPTION_INVALID,
        }),

    thumbnail: Joi.string()
        .allow("")
        .messages({
            "string.base": validationMessages.THUMBNAIL_INVALID,
        }),

    category: Joi.string()
        .trim()
        .min(1)
        .messages({
            "string.empty": validationMessages.COURSE_CATEGORY_REQUIRED,
            "string.base": validationMessages.COURSE_CATEGORY_INVALID,
        }),

    difficultyLevel: Joi.string()
        .valid("Beginner", "Intermediate", "Advanced")
        .messages({
            "any.only": validationMessages.DIFFICULTY_INVALID,
            "string.base": validationMessages.VALUE_INVALID,
        }),

    duration: Joi.number()
        .positive()
        .messages({
            "number.base": validationMessages.DURATION_INVALID,
            "number.positive": validationMessages.DURATION_POSITIVE,
        }),

    price: Joi.number()
        .min(0)
        .messages({
            "number.base": validationMessages.PRICE_INVALID,
            "number.min": validationMessages.PRICE_NEGATIVE,
        }),

    requirements: Joi.array()
        .items(
            Joi.string().trim().messages({
                "string.base": validationMessages.REQUIREMENT_ITEM_INVALID,
            })
        )
        .messages({
            "array.base": validationMessages.REQUIREMENTS_INVALID,
        }),

    learningOutcomes: Joi.array()
        .items(
            Joi.string().trim().messages({
                "string.base": validationMessages.LEARNING_OUTCOME_ITEM_INVALID,
            })
        )
        .messages({
            "array.base": validationMessages.LEARNING_OUTCOMES_INVALID,
        }),

    lessons: Joi.array()
        .items(
            Joi.string().hex().length(24).messages({
                "string.hex": validationMessages.LESSON_ID_INVALID,
                "string.length": validationMessages.LESSON_ID_INVALID,
                "string.base": validationMessages.LESSON_ID_INVALID,
            })
        )
        .messages({
            "array.base": validationMessages.LESSONS_INVALID,
        }),

    status: Joi.string()
        .valid("Draft", "Published")
        .messages({
            "any.only": validationMessages.STATUS_INVALID,
        }),
};


// Create Course Schema
const courseSchema = Joi.object({
    ...courseFields,

    title: courseFields.title.required().messages({
        "any.required": validationMessages.COURSE_TITLE_REQUIRED,
    }),

    description: courseFields.description.required().messages({
        "any.required": validationMessages.COURSE_DESCRIPTION_REQUIRED,
    }),

    category: courseFields.category.required().messages({
        "any.required": validationMessages.COURSE_CATEGORY_REQUIRED,
    }),

    difficultyLevel: courseFields.difficultyLevel.required().messages({
        "any.required": validationMessages.DIFFICULTY_REQUIRED,
    }),

    duration: courseFields.duration.required().messages({
        "any.required": validationMessages.DURATION_REQUIRED,
    }),

    price: courseFields.price.required().messages({
        "any.required": validationMessages.PRICE_REQUIRED,
    }),

    status: Joi.forbidden().messages({
        "any.unknown": validationMessages.STATUS_NOT_ALLOWED,
    }),
});


// Update Course Schema
const updateCourseSchema = Joi.object({
    ...courseFields,

    status: Joi.forbidden().messages({
        "any.unknown": validationMessages.STATUS_NOT_ALLOWED,
    }),
})
    .min(1)
    .messages({
        "object.min": validationMessages.UPDATE_FIELD_REQUIRED,
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
                message: validationMessages.COURSE_VALIDATION_FAILED,
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
