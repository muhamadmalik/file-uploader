import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
});

const upload = multer({ dest: "uploads/" }); 

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads", 
    });

    fs.unlinkSync(filePath);
    return result.secure_url; 
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export { upload, uploadToCloudinary };
