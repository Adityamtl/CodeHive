import { useState } from 'react'
import GradientText from '../GradientText'
import { deleteUser } from '@/api/user';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const DeleteAcount = () => {
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const handleDelete = async () => {
    
    if (deleteConfirm !== "DELETE") {
      return;
    }
    else {
      const toastId = toast.loading("Deleting account...");
      const res = await deleteUser();

      if (!res) {
        toast.update(toastId, {
          render: "Error deleting account",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      window.location.href = "/";
    }
  }

  return (
    <div className=' w-[95%] lg:w-[800px] min-h-[250px] bg-[#101622] mx-auto rounded-lg p-6 mt-8'>
      <div className=' w-full flex flex-col gap-8 items-center'>
        <GradientText className={"text-xl sm:text-2xl font-bold"} >Delete Account</GradientText>

        <div className=' w-full text-base sm:text-lg font-semibold'>
          Deleting your Account will permanently remove all your data from our database and cannot be undone. Are you sure you want to delete your account?
        </div>

        <div className=' w-full flex flex-col '>
          <p className=' text-xs font-semibold text-gray-400 mb-1'>To confirm this, type &apos;&apos;DELETE&apos;&apos;</p>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-y-3' >
            <input
              className="border border-gray-600 bg-transparent rounded-md sm:w-[300px]  p-2 "
              name="deleteConfirm"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              type="text"
            />
            <motion.button 
              onClick={handleDelete} 
              className={` bg-[#d03739] px-6 py-2 rounded-md font-semibold w-fit self-end `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Account
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAcount
