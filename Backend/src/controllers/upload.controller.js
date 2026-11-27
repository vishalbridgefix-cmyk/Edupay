import uploadToCloudinary from "../utils/uploadToCloudinary.js";

import { HttpStatusCode } from "../constants/httpStatus.js";
import { Messages } from "../constants/messages.js";

// Upload Profile Image
export const uploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.UPLOAD_IMAGE,
            });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "EduPay/profileImages"
        );

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: Messages.SUCCESSFULLY_IMAGE_UPLOAD,
            data: {
                imageUrl: result.secure_url,
                publicId: result.public_id,
            },
        });

    } catch (error) {

        console.error("Profile Upload Error:", error);

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: Messages.FAILED_IMAGE_UPLOAD,
        });

    }
};


// Upload Course Thumbnail
export const uploadCourseThumbnail = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: Messages.UPLOAD_COURSE_THUMBNAIL,
            });
        }

        const result = await uploadToCloudinary(
            req.file.buffer,
            "EduPay/courseThumbnails"
        );

        return res.status(HttpStatusCode.SUCCESS).json({
            success: true,
            message: Messages.UPLOAD_THUMBNAIL_SUCCESSFULLY,
            data: {
                thumbnail: result.secure_url,
                thumbnailPublicId: result.public_id,
            },
        });

    } catch (error) {

        console.error("Course Thumbnail Upload Error:", error);

        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: Messages.UPLOAD_THUMBNAIL_FAILED,
        });

    }
};
