import uploadToCloudinary from "../utils/uploadToCloudinary.js";

import { HttpStatusCode } from "../constants/httpStatus.js";

export const uploadImage = async (req, res) => {

  try {

    
    if (!req.file) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Return Cloudinary URL
    return res.status(HttpStatusCode.SUCCESS).json({

      success: true,

      message: "Image uploaded successfully",

      data: {
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },

    });

  } catch (error) {

    console.error("Upload Error:", error);

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({

      success: false,

      message: "Image upload failed",

    });

  }

};