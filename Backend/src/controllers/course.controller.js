import Course from '../models/course.model.js'
// Route for create course post route
// /api/courses

const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            thumbnail,
            category,
            difficultyLevel,
            duration,
            price,
            requirements,
            learningOutcomes,
            lessons
        } = req.body;

        // Check required fields
        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description and category are required"
            });
        }

        // Create new course
        const course = await Course.create({
            title,
            description,
            thumbnail,
            category,
            difficultyLevel,
            duration,
            price,
            requirements,
            learningOutcomes,
            lessons,
            status: "Draft"
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//For checking instructor course is present or not get method
// /api/courses/mine

const getMyCourses = async (req, res) => {
    try {
        //Authticate from middleware
        const instructorId = req.user?.id;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        // Find courses created by instructor
        const courses = await Course.find({
            instructor: instructorId
        });

        return res.status(200).json({
            success: true,
            message: "Instructor courses fetched successfully",
            count: courses.length,
            data: courses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// All course detail get route
// /api/courses/:courseId

const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//Update course using id patch method
// /api/courses/:courseId

const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const instructorId = req.user?.id;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        // Find and update only instructor's own course
        const course = await Course.findOneAndUpdate(
            {
                _id: courseId,
                instructor: instructorId
            },
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or you are not authorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//Delete course delete method
// /api/courses/:courseId

const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const instructorId = req.user?.id;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        // Delete only instructor's own course
        const course = await Course.findOneAndDelete({
            _id: courseId,
            instructor: instructorId
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or you are not authorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//Publish route using patch method
// /api/courses/:courseId/publish

const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const instructorId = req.user?.id;

        if (!instructorId) {
            return res.status(401).json({
                success: false,
                message: "Instructor authentication is required"
            });
        }

        // Find instructor's own course
        const course = await Course.findOne({
            _id: courseId,
            instructor: instructorId
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found or you are not authorized"
            });
        }

        // Check required course details
        if (
            !course.title ||
            !course.description ||
            !course.category
        ) {
            return res.status(400).json({
                success: false,
                message: "Complete course details before publishing"
            });
        }

        // Change Draft status to Published
        course.status = "Published";

        await course.save();

        return res.status(200).json({
            success: true,
            message: "Course published successfully",
            data: course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Export all the controller for using the routes

export {
    createCourse,
    getMyCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    publishCourse
};
