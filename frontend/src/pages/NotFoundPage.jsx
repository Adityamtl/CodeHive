import  notFoundImg from '../assets/Error/404.png';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  }

  return (
    <div className='bg-[#000814] h-screen w-full flex flex-col justify-start items-center  '>
        <img className=' w-[300px] sm:h-[500px] sm:w-[400px] ' src={notFoundImg} alt="" />
        <div className=' flex flex-col justify-between items-center gap-2 sm:gap-1 font-semibold'>
            <div className=' text-center text-2xl sm:text-3xl'>OOPs! Sorry,</div>
            <div className=' text-center text-xl sm:text-2xl'>We can't find the page you are looking for.</div>
            <div className=' text-center text-xl'>Please go back to the home page</div>
            <button onClick={handleNavigate} className=' bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full'>Back to Home</button>
        </div>
    </div>
  )
}

export default NotFoundPage
