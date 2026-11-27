import Joi from "joi";
import { validationMessages } from "../constants/messages";

// Create Lesson Validation
export const createLessonSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": validationMessages.LESSON_TITLE_REQUIRED,
            "string.min": validationMessages.LESSON_TITLE_MIN,
            "string.max": validationMessages.LESSON_TITLE_MAX,
            "any.required": validationMessages.LESSON_TITLE_REQUIRED,
        }),

    description: Joi.string()
        .trim()
        .allow("")
        .optional(),

    contentType: Joi.string()
        .valid("video", "article", "slides", "resources")
        .required()
        .messages({
            "any.only": validationMessages.LESSON_CONTENT_TYPE_INVALID,
            "any.required": validationMessages.LESSON_CONTENT_TYPE_REQUIRED,
        }),

    content: Joi.string()
        .allow("")
        .optional(),

    videoUrl: Joi.string()
        .uri()
        .allow("")
        .optional(),

    duration: Joi.number()
        .min(0)
        .default(0),

    order: Joi.number()
        .integer()
        .min(1)
        .default(1),

    resources: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().trim().required(),
                url: Joi.string().uri().required(),
                type: Joi.string()
                    .valid("pdf", "document", "image", "link", "other")
                    .default("other"),
            })
        )
        .default([]),
});

// Update Lesson Validation
export const updateLessonSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100),

    description: Joi.string()
        .trim()
        .allow(""),

    contentType: Joi.string()
        .valid("video", "article", "slides", "resources"),

    content: Joi.string()
        .allow(""),

    videoUrl: Joi.string()
        .uri()
        .allow(""),

    duration: Joi.number()
        .min(0),

    order: Joi.number()
        .integer()
        .min(1),

    resources: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().trim().required(),
                url: Joi.string().uri().required(),
                type: Joi.string()
                    .valid("pdf", "document", "image", "link", "other")
                    .default("other"),
            })
        ),
}).min(1);
