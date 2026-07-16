import Left from '../components/Auth/Left'
import Right from '../components/Auth/Right'
import Meteors from '@/components/ui/meteors'

const Auth = () => {
  return (
    <>
      <div className="bg-[#000814] relative main w-full h-screen flex flex-col lg:flex-row overflow-x-hidden">
        <Meteors number={50} />
        <div className=" h-[16%] sm:h-[30%] lg:w-1/2 lg:h-full">
          <Left />
        </div>
        
        <div className="relative h-[84%] sm:h-[70%] lg:w-1/2 lg:h-full">
          <Right/>
        </div>
      </div>
    </>
  )
}

export default Auth
