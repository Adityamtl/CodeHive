import errorGif from '../assets/Error/error.gif'

const ErrorPage = () => {
  return (
    <div className=' h-screen w-full flex flex-col gap-4 justify-center items-center bg-[#f7f9fb]  '>
        <div className=' flex flex-col justify-between items-center gap-4'>
            <div className=' text-center text-4xl sm:text-5xl font-extralight text-blue-500'>500</div>
            <div className=' text-center text-3xl sm:text-5xl font-semibold text-black'>Internal Server Error</div>
            <div className=' text-center text-md sm:text-xl font-semibold text-black'>Please try again later or feel free to contact us if the problem persists.</div>
        </div>
        <img className=' w-[280px] sm:w-[350px] ' src={errorGif} alt="" />
    </div>
  )
}

export default ErrorPage
