import uploadToCloudinary from "../utils/uploadToCloudinary.js";

import { HttpStatusCode } from "../constants/httpStatus.js";

// Upload Profile Image
export const uploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "Please upload an image",
            });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "EduPay/profileImages"
        );

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                imageUrl: result.secure_url,
                publicId: result.public_id,
            },
        });

    } catch (error) {

        console.error("Profile Upload Error:", error);

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Image upload failed",
        });

    }
};


// Upload Course Thumbnail
export const uploadCourseThumbnail = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "Please upload a course thumbnail",
            });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "EduPay/courseThumbnails"
        );

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: "Course thumbnail uploaded successfully",
            data: {
                thumbnail: result.secure_url,
                thumbnailPublicId: result.public_id,
            },
        });

    } catch (error) {

        console.error("Course Thumbnail Upload Error:", error);

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Course thumbnail upload failed",
        });

    }
};
