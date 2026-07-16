import logo from '@/assets/Auth/CodeHive Logo.png'

const Text = ({ className }) => {
    return (
        <>
            <div className={` flex flex-col absolute text-white px-4 md:px-12 py-8 w-full lg:w-[75%] xl:w-[70%] 2xl:w-[60%] lg:gap-y-36 xl:gap-y-32 ${className} `}>
                <div className=' flex justify-center lg:justify-start items-center gap-2 md:gap-3'>
                    <img className=' size-12 md:size-14 lg:size-11 ' src={logo} alt="logo" />
                    <div className=' text-white font-bold text-3xl md:text-3xl lg:text-2xl'>CodeHive</div>
                </div>
                <div className=' hidden lg:flex flex-col gap-8 '>
                    <div className=' lg:text-3xl xl:text-3xl'>A space for coding and collaboration.</div>
                    <div className=' '>Collaborate, Code, and Create - All in the Sphere of Possibilities.</div>
                </div>
            </div>
        </>

    )
}

export default Text
