import { useState } from 'react'
import GradientText from '../GradientText'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { updatePassword } from '@/api/user';
import { motion } from 'framer-motion';

const UpdatePass = () => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");

    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const handleSave = async () => {
        if(!oldPass || !newPass){
          return;
        }
        if(newPass.length < 6){
          toast.error("Password must be atleast 6 characters long", { autoClose: 3000 });
          return;
        }
        if(oldPass === newPass){
          toast.error("Old password and new password can't be same", { autoClose: 3000 });
          return;
        }

        let data = {
          oldPassword: oldPass,
          newPassword: newPass
        }

        const toastId = toast.loading("Updating password...");
        const res = await updatePassword(data);

        if(!res) {
          toast.update(toastId, { 
            render: "Failed to update password", 
            type: "error", 
            isLoading: false, 
            autoClose: 3000 
          });
          return;
        }
        toast.update(toastId, { 
          render: "Password updated successfully", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });
        setOldPass("");
        setNewPass("");
    }

  return (
    <div className=' w-[95%] lg:w-[800px] min-h-[250px] bg-[#101622] mx-auto rounded-lg p-6 mt-8'>
      <div className=' w-full flex flex-col gap-8 items-center'>
        <GradientText className={"text-xl sm:text-2xl font-bold"} >Update Password</GradientText>

        <div className=' w-full flex flex-col gap-y-3 md:flex-row justify-between items-center'>
          <div className=' flex flex-col relative'>
            <p className=' font-semibold'>Old Password</p>
            <input
              className="border border-gray-600 bg-transparent rounded-md w-[240px] sm:w-[280px] mt-2 p-2 "
              name="oldPassword"
              type={showPass1 ? "text" : "password"}
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <span
              className="absolute right-3 top-10 translate-y-[20%] z-[10] cursor-pointer text-xl"
              onClick={() => setShowPass1(!showPass1)}
            >
              { showPass1 ?  <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <div className=' flex flex-col relative'>
            <p className=' font-semibold'>New Password</p>
            <input
              className="border border-gray-600 bg-transparent rounded-md w-[240px] sm:w-[280px] mt-2 p-2 "
              name="oldPassword"
              type={showPass2 ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <span
              className="absolute right-3 top-10 translate-y-[20%] z-[10] cursor-pointer text-xl"
              onClick={() => setShowPass2(!showPass2)}
            >
              { showPass2 ?  <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
        </div>

        <motion.button 
          onClick={handleSave} 
          className={` bg-[#1a8cd8] px-4 py-1 rounded-md font-semibold self-end `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
      </div>
    </div>
  )
}

export default UpdatePass
