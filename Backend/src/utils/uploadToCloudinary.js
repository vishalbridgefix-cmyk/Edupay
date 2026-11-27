import { Readable } from "stream";
import { pipeline } from "stream/promises";

import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (
    fileBuffer,
    folder = "EduPay"
) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
                timeout: 30000,
            },

            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        pipeline(
            Readable.from([fileBuffer]),
            uploadStream
        ).catch(reject);

    });
};

export default uploadToCloudinary;
