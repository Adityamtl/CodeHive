import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCallback, useEffect, useState } from 'react'
import {SquareX} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '@/features/EditorSlice/sidebarSlice.js'
import { openRemoteEditor } from '@/features/EditorSlice/remoteEditorSlice'
import { useLocation } from 'react-router-dom'
import { getMembers } from '@/api/user'
import { setremoteUserId, setRemoteUserName } from '@/features/CodeSlice/codeSlice'
import { toast } from 'react-toastify'

const Participants = () => {
  
  const participantsChange = useSelector((state) => state.room.room.participantsChange);
  const isRemoteVisible = useSelector((state) => state.room.room.roomDetails.isVisible);
  const roomAdmin = useSelector((state) => state.room.room.roomDetails.admin);
  const user = useSelector((state) => state.profile.user);
  const userId = user._id;
  const dispatch = useDispatch();
  const location = useLocation();

  const roomId = location?.state?.roomId;

  const [participants, setParticipants] = useState([]);

  const getParticipants = useCallback(async () => {
    await new Promise(r => setTimeout(r,1000));
    const res = await getMembers(roomId);

    if(!res){
      return;
    }

    let members = res?.members;
    setParticipants(members);
    console.log("Room Memebers:",members);
  }, [roomId])

  useEffect(() => {
    getParticipants();

  }, [getParticipants, participantsChange])

  const handleOpenRemoteEditor = (remoteUser) => {
    if(roomAdmin !== user._id && !isRemoteVisible){
      toast.warning("Prohibited to see others screen by admin", {autoClose: 3000, position: "top-right"});
      return;
    }

    if(remoteUser.email != user.email){
      dispatch(setremoteUserId(remoteUser._id));
      dispatch(setRemoteUserName(remoteUser.firstName + " " + remoteUser.lastName));
      dispatch(openRemoteEditor());
    }
  }
  

  return (
    <div className=' h-full w-full px-4 relative '>
      <SquareX onClick={() => dispatch(toggleSidebar())} className=' absolute top-2 right-2 cursor-pointer'/>

      <div className='flex justify-center font-semibold text-lg pb-1 '>Participants</div>
      <div className=' h-[80%] w-full flex flex-col gap-4 overflow-y-auto  '>
        {
          participants.map((user, index) => {
            return (
              <div onClick={() => {handleOpenRemoteEditor(user)}} key={index} className=' w-full flex items-center gap-6 cursor-pointer'>
                <div className=' border-2 border-transparent bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full'>
                  <Avatar className="rounded-full">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.slice(0, 1)}{user?.lastName?.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className='text-xl font-semibold'>{user?.firstName} {user?.lastName} {user._id == userId ? " (You)" : ""}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Participants
