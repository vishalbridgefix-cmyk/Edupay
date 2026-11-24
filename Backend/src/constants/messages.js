export const Messages = Object.freeze({
  // Success Messages
  SUCCESS: "Operation completed successfully",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  FETCHED: "Data fetched successfully",
  ALL_COURSES_FETCHED: "All published courses fetched successfully",

  // Authentication Messages
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  REGISTER_SUCCESS: "Registration successful",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Authentication is required",
  FORBIDDEN: "You are not authorized to perform this action",
  TOKEN_EXPIRED: "Authentication token has expired",
  INVALID_TOKEN: "Invalid authentication token",

  // Validation Messages
  VALIDATION_ERROR: "Validation failed",
  REQUIRED_FIELDS: "Please provide all required fields",
  INVALID_ID: "Invalid ID provided",
  INVALID_INPUT: "Invalid input data",

  // Resource Messages
  NOT_FOUND: "Resource not found",
  ALREADY_EXISTS: "Resource already exists",
  DUPLICATE_ENTRY: "Duplicate entry found",


  // Course Messages
  COURSE_CREATED: "Course created successfully",
  COURSE_UPDATED: "Course updated successfully",
  COURSE_DELETED: "Course deleted successfully",
  COURSE_FETCHED: "Courses fetched successfully",
  COURSE_NOT_FOUND: "Course not found",
  COURSE_ALREADY_EXISTS: "Course already exists",
  COURSE_PUBLISHED: "Course published successfully",
  COURSE_UNPUBLISHED: "Course unpublished successfully",

  // Extra Course Messages
  INVALID_COURSE_ID: "Invalid course id",
  COURSE_NOT_FOUND_OR_UNAUTHORIZED:
    "Course not found or you are not authorized to access it",
  INSTRUCTOR_COURSES_FETCHED: "Instructor courses fetched successfully",
  COURSE_DETAILS_FETCHED: "Course details fetched successfully",
  COMPLETE_COURSE_DETAILS:
    "Please complete all required course details before publishing",

  // Instructor / Auth Messages
  INSTRUCTOR_AUTH_REQUIRED: "Instructor authentication is required",
  INSTRUCTOR_ID_NOT_FOUND: "Instructor id not found",

  // Server Messages
  INTERNAL_SERVER_ERROR: "Internal server error",
  DATABASE_ERROR: "Database operation failed",
  SOMETHING_WENT_WRONG: "Something went wrong",

  // Authentication Middleware Messages
  AUTH_TOKEN_REQUIRED: "Authentication token is required",
  USER_LOGGED_OUT: "You are logged out",
  INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
  LOGIN_REQUIRED: "Please login first",

  // Authorization Messages
  INSTRUCTOR_ONLY: "Only instructors can manage courses",

  // Module Messages
  MODULE_TITLE_REQUIRED: "Module title is required",
  MODULE_CREATED: "Module created successfully",
  MODULES_FETCHED: "Modules fetched successfully",
  INVALID_MODULE_ID: "Invalid module id",
  INVALID_MODULE_ORDER: "Order must be a positive integer",
  MODULE_NOT_FOUND: "Module not found",
  MODULE_UPDATED: "Module updated successfully",
  MODULE_DELETED: "Module deleted successfully",
  COURSE_VIEW_FORBIDDEN: "You are not allowed to view this course",

  // Common
  NO_VALID_FIELDS: "No valid fields provided to update",
// Authorization Messages
INSTRUCTOR_ONLY: "Only instructors can manage courses",

//User Messages

USER_FETCHED:"User Fetched successFully",
USER_UPDATED:"User Updated SuccesFully"
});

// Joi Validation Messages
export const validationMessages = Object.freeze({
  // Course Title
  COURSE_TITLE_REQUIRED: "Course title is required",
  COURSE_TITLE_MIN: "Course title must be at least 3 characters",
  COURSE_TITLE_MAX: "Course title cannot exceed 100 characters",
  COURSE_TITLE_INVALID: "Course title must be a string",

  // Course Description
  COURSE_DESCRIPTION_REQUIRED: "Course description is required",
  COURSE_DESCRIPTION_MIN: "Description must be at least 10 characters",
  COURSE_DESCRIPTION_MAX: "Description cannot exceed 2000 characters",
  COURSE_DESCRIPTION_INVALID: "Course description must be a string",

  // Thumbnail
  THUMBNAIL_INVALID: "Thumbnail must be a valid string",

  // Category
  COURSE_CATEGORY_REQUIRED: "Course category is required",
  COURSE_CATEGORY_INVALID: "Course category must be a string",

  // Difficulty Level
  DIFFICULTY_REQUIRED: "Difficulty level is required",
  DIFFICULTY_INVALID: "Difficulty must be Beginner, Intermediate, or Advanced",

  // Duration
  DURATION_REQUIRED: "Course duration is required",
  DURATION_INVALID: "Duration must be a number",
  DURATION_POSITIVE: "Duration must be greater than zero",

  // Price
  PRICE_REQUIRED: "Course price is required",
  PRICE_INVALID: "Price must be a number",
  PRICE_NEGATIVE: "Price cannot be negative",

  // Requirements
  REQUIREMENTS_INVALID: "Requirements must be an array",
  REQUIREMENT_ITEM_INVALID: "Each requirement must be a string",

  // Learning Outcomes
  LEARNING_OUTCOMES_INVALID: "Learning outcomes must be an array",
  LEARNING_OUTCOME_ITEM_INVALID: "Each learning outcome must be a string",

  // Lessons
  LESSONS_INVALID: "Lessons must be an array",
  LESSON_ID_INVALID:
    "Each lesson ID must be a valid 24-character MongoDB ObjectId",

  // Status
  STATUS_INVALID: "Status must be Draft or Published",
  STATUS_NOT_ALLOWED: "You cannot provide course status",

  // Update Course
  UPDATE_FIELD_REQUIRED: "At least one field is required for update",

  // Module Title
  MODULE_TITLE_REQUIRED: "Module title is required",
  MODULE_TITLE_MIN: "Module title must be at least 3 characters",
  MODULE_TITLE_MAX: "Module title cannot exceed 120 characters",
  MODULE_TITLE_INVALID: "Module title must be a string",

  // Module Description
  MODULE_DESCRIPTION_MAX: "Module description cannot exceed 500 characters",
  MODULE_DESCRIPTION_INVALID: "Module description must be a string",

  // Module Order
  MODULE_ORDER_INVALID: "Module order must be a number",
  MODULE_ORDER_INTEGER: "Module order must be a whole number",
  MODULE_ORDER_MIN: "Module order must be at least 1",
  MODULE_ORDER_NOT_ALLOWED:
    "You cannot provide module order while creating a module",

  // General Module Validation
  MODULE_UPDATE_FIELD_REQUIRED:
    "At least one field is required to update the module",
  MODULE_VALIDATION_FAILED: "Module validation failed",

  // General Joi Validation
  FIELD_NOT_ALLOWED: "This field is not allowed",
  FIELD_REQUIRED: "This field is required",
  VALUE_INVALID: "Invalid value provided",
  COURSE_VALIDATION_FAILED: "Course validation failed",
});
