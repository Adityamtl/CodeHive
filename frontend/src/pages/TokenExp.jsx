import tokenExp from '../assets/Token/token-exp.png'

const TokenExp = () => {
  return (
    <div className='bg-[#000814] h-screen w-full flex flex-col justify-start items-center mt-10  '>
        <img className=' w-[300px] sm:h-[400px] sm:w-[400px] ' src={tokenExp} alt="" />
        <div className=' flex flex-col justify-between items-center gap-2 sm:gap-1 font-semibold'>
            <div className=' text-center text-2xl sm:text-3xl'>The link has been expired</div>
            <div className=' text-center text-xl sm:text-2xl'>Please try again</div>
        </div>
    </div>
  )
}

export default TokenExp
