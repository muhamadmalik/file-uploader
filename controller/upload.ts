import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

const upload = multer({ dest: 'uploads/' });

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',
    });

    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
};
function extractPublicId(url) {
  return url.replace(/^.*\/upload\/[^/]+\//, '').replace(/\.[^/.]+$/, '');
}

const delCloudFile = async (url: string | undefined) => {
  try {
    const publicId = extractPublicId(url);
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export { upload, uploadToCloudinary, delCloudFile };
