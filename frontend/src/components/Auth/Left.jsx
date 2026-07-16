import BlackCircle from '../Animations/BlackCircle'
import OrangeCircle from '../Animations/OrangeCircle'
import WhiteCircle from '../Animations/WhiteCircle'
import Card from './Card'
import BorderCircle from '../Animations/BorderCircle'
import Text from './Text'

import img1 from '@/assets/Auth/img1.jpg'
import img2 from '@/assets/Auth/img2.jpg'

const Left = () => {
  return (
    <>
      <div className=' w-full h-full relative '>
        <BorderCircle />
        <BlackCircle />
        <OrangeCircle />
        <WhiteCircle />
        <Card img={img1} className={"  hidden lg:block lg:w-56 2xl:w-56 lg:h-48 2xl:h-48  lg:top-[410px] xl:top-[340px] 2xl:top-[340px] lg:left-[275px] xl:left-[320px] 2xl:left-[320px] delay-[1200ms] transition-all animate-curveMove"} />
        <Card img={img2} className={"  hidden lg:block lg:w-40 2xl:w-40 lg:h-56 2xl:h-56  lg:top-[480px] xl:top-[400px] 2xl:top-[400px] lg:left-[55px] xl:left-[70px] 2xl:left-[70px] -rotate-[7deg] delay-[2100ms] transition-all animate-curveMove2"} />
        <Text className={" transition-all animate-fadeIn"}/>
      </div>
    </>
  )
}

export default Left
