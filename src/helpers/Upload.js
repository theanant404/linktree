"use server";
import { writeFile } from "fs/promises";
import uniqid from "uniqid";
import {uploadOnCloudinary} from "./cloudinary"
import {v2 as cloudinary} from 'cloudinary';

let ImageData= null; 
export const UploadImage=async (req,res)=>{
    const data = await req;
    for (const entry of data.entries()){
        const[name,value]=entry;
        const file=data.get(name)
        if(file){
            const ext=file.name.split(".").slice(-1);
            const newFileName='esports'+uniqid()+"."+ext;
            const byteData=await file.arrayBuffer();
            const buffer=Buffer.from(byteData);
            const path=`./public/${newFileName}`;
            writeFile(path,buffer);
            const imageUrl=await uploadOnCloudinary(path)
            ImageData={
                image_Url:imageUrl.secure_url,
                public_id:imageUrl.public_id
            }
            // console.log("image data",ImageData)
            // ImageData.push(ImageData)
        }
    }
    // console.log("image data",ImageData)
    return ImageData;
}
export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    try {
      console.log("punlic id form delet function",publicId)
      if (!publicId) return null;
      // delete from cloudinary
      const response = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
      return response;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };