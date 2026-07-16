import { MagicCard } from '../ui/magic-card'
import { House, Plus } from 'lucide-react'

const JoinRoom = () => {
  return (
    <div className="p-[0.8px] rounded-md relative w-full inline-block">
          <div className="absolute inset-0 rounded-md animate-border-hover pointer-events-none"></div>
          <MagicCard
            className="flex flex-col items-center px-4 py-3 dark:bg-black/20 dark:hover:bg-black/100 border-[1px] border-slate-500 hover:border-transparent rounded-md cursor-pointer transition-all duration-300"
            gradientColor={"#363636"}
          >
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-x-2 sm:gap-x-4">
                <House size={34} color="#3178C6" />
                <div>
                  <p className="text-purple-300 text-start text-sm sm:text-base sm:font-semibold">JOIN ROOM</p>
                  <p className="text-gray-400 text-start text-xs sm:text-sm">
                    Join an existing room with the RoomID
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Plus size={28} color="#fff" />
              </div>
            </div>
          </MagicCard>
        </div>
  )
}

export default JoinRoom
