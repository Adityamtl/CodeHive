import { v2 as cloudinary } from "cloudinary"

export const deleteImage = async (url,folder) => {
    try{    
        const publicId = `${folder}` + "/" + url.split("/").pop().split(".")[0];
        const res = await cloudinary.uploader.destroy(publicId)
        return res
    }catch(error){
        console.log("Error in deleteImage");
    }
}