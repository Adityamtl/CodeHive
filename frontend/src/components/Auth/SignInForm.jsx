import { useState } from 'react'
import { IoMdMailUnread } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import GradientText from '../GradientText';
import GoogleAuthButton from './GoogleAuthButton';
import { login } from '@/api/user';
import { toast } from 'react-toastify';
import { setUserObj } from '@/features/Profile/profileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import EmailField from '../ForgotPassword/EmailField';

const SignInForm = ({className}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [focusStates, setFocusStates] = useState({
        email: false,
        password: false
    })
    
    const [showPassword, setShowPassword] = useState(false)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!form.email || !form.password){
            toast.error("All fields are required", { autoClose: 3000 });
            return;
        }
        const toastId = toast.loading("Loading...");

        const res = await login(form);

        if(res.success === false){
            toast.update(toastId, {
                render: res.message,
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
            return;
        }

        let userData = {
            firstName: res?.user?.firstName ?? "",
            lastName: res?.user?.lastName ?? "",
            email: res?.user?.email ?? "",
            about: res?.user?.about ?? "",
            imageUrl: res?.user?.imageUrl ?? "",
            googleId: res?.user?.googleId ?? ""
        }

        dispatch(setUserObj(userData));

        toast.update(toastId, {
                render: "Logged in successfully",
                type: "success",
                isLoading: false,
                autoClose: 3000
        });

        navigate("/");
    }

  return (
    <>
        <div className={` ${className} flex flex-col gap-8 w-[92%] md:w-[60%] lg:w-[80%] xl:w-[75%] 2xl:w-[65%] `}>
            <header>
                <div className=' text-2xl md:text-4xl lg:text-3xl xl:text-4xl font-mono font-bold mb-2  '>Sign In to <GradientText>CodeHive</GradientText> </div>
                <div>Enter your details below</div>
            </header>

            <form onSubmit={handleSubmit} className=' flex flex-col gap-3' action="">
                <div className=' relative flex items-center'>
                    <input 
                        type="text" 
                        placeholder='Enter Email Address'
                        autoComplete='off'
                        className=' border border-[#b1b1b1] rounded-lg p-3 pl-8 w-full focus: outline-[#d6927c]  bg-[#27272A]'  
                        name='email'
                        onFocus={(e) => setFocusStates({...focusStates, [e.target.name]: true})}
                        onBlur={(e) => setFocusStates({...focusStates, [e.target.name]: false})}
                        value={form.email}
                        onChange={handleChange}
                    />
                    <IoMdMailUnread className={` absolute left-2 text-[#8f8f8f] ${focusStates.email ? "text-[#fb4c19]" : "text-[#b1b1b1]"}`} />
                </div>

                <div className=' relative flex items-center'>
                    <input 
                        type={`${showPassword ? "text" : "password"}`}
                        placeholder='Enter Password'
                        autoComplete='off'
                        className=' border border-[#b1b1b1] rounded-lg p-3 4 pl-8 w-full focus: outline-[#d6927c] bg-[#27272A]'  
                        name='password'
                        onFocus={(e) => setFocusStates({...focusStates, [e.target.name]: true})}
                        onBlur={(e) => setFocusStates({...focusStates, [e.target.name]: false})}
                        value={form.password}
                        onChange={handleChange}
                    />
                    <FaLock className={` absolute left-2 ${focusStates.password ? "text-[#fb4c19]" : "text-[#b1b1b1]"}`} />
                    <FaEye onClick={() => setShowPassword(!showPassword)} className={` absolute right-2 size-5 ${showPassword ? "block" : "hidden"} ${focusStates.password ? "text-[#fb4c19]" : "text-[#b1b1b1]"} cursor-pointer`} />
                    <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className={` absolute right-2 size-5 ${showPassword ? "hidden" : "block"} ${focusStates.password ? "text-[#fb4c19]" : "text-[#b1b1b1]"} cursor-pointer`} />
                </div> 

                <button type='submit' className={` bg-[#fb4c19] rounded-3xl px-8 py-3 text-white `}>LOG IN</button>
            </form>
            <div className='-mt-5'>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger className='w-full'>
                    <div className='text-[#fb4c19] cursor-pointer  -my-6 text-end'>Forgot Password ?</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] min-h-[30vh]">
                    <DialogTitle>Forgot Password</DialogTitle>
                    <EmailField setDialogOpen={setDialogOpen} />
                </DialogContent>
            </Dialog>
            </div>
            <div className='flex w-full -my-5 items-center'>
                <div className='w-full h-[1px] bg-white'></div>
                <span className='px-2'>OR</span>
                <div className='w-full h-[1px] bg-white'></div>
            </div>

            <GoogleAuthButton signIn={true} />
        </div>
    </>
  )
}

export default SignInForm
