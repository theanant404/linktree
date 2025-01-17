
"use server"

import fs from "fs"

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
  console.log("localFilePath", localFilePath)
    try {
      if (!localFilePath) return null;
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      // console.log("file is uploaded on cloudinary ", response.url);
      fs.unlinkSync(localFilePath);
  
      return response;
    } catch (error) {
        console.log("error in uplodin________", error)
      fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
      return null;
    }
  };
export { uploadOnCloudinary}