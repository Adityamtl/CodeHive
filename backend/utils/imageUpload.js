import {v2 as cloudinary } from "cloudinary";

export const imageUpload = async (fileUrl) => {
    try{
        let option = {
            folder: "Profile-pic",
            quality: "1000",
            resource_type: "auto"
        };

        const res = await cloudinary.uploader.upload(fileUrl, option);
        return res;
    }catch(error){
        console.log("Error in imageUpload: ", error);
    }
}