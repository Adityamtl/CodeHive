import { useState } from 'react'
import { IoMdMailUnread } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import GradientText from '../GradientText';
import GoogleAuthButton from './GoogleAuthButton';
import OtpInputBox from './OtpInputBox';
import { Bounce, toast } from 'react-toastify';
import { sendOtp, signUp } from '@/api/user';
import { setUserObj } from '@/features/Profile/profileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [focusStates, setFocusStates] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phNo: false,
        password1: false,
        password2: false
    })

    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: ''
    })

    const [otp, setOtp] = useState("")
    const [otpDialogOpen, setOtpDialogOpen] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.firstName || !form.lastName || !form.email || !form.password1 || !form.password2) {
            toast.error('All fields are required', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
            return;
        }

        if (!emailRegex.test(form.email)) {
            toast.error('Enter a valid email', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
            return;
        }

        if (form.password1.length < 6) {
            toast.error('Password must be at least 6 characters', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
            return;
        }

        if (form.password1 !== form.password2) {
            toast.error('Passwords do not match', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
            return;
        }

        const toastId = toast.loading("Loading...");
        try {
            const res = await sendOtp(form.email);
            if (!res) {
                toast.update(toastId, {
                    render: "An error occured",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                });
                return;
            }

            if (res.userExists) {
                toast.update(toastId, {
                    render: "User already exists",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                });
                return;
            }

            toast.update(toastId, {
                render: "OTP sent successfully",
                type: "success",
                isLoading: false,
                autoClose: 3000
            });

            setOtpDialogOpen(true);
        } catch {
            console.log("Error in SignInForm while sending OTP");
            toast.update(toastId, {
                render: "An error occured",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        }
    }

    const handleOtpSubmit = async () => {
        const toastId = toast.loading("Loading...");

        const res = await signUp(form, otp);
        if (!res) {
            toast.update(toastId, {
                render: "An error occured",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
            setOtpDialogOpen(false);
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
            render: "Account created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000
        });

        setOtpDialogOpen(false);
        navigate("/");
        window.location.reload();
    }

    return (
        <>
            <div className={` ${className} flex flex-col gap-8 w-[92%] md:w-[60%] lg:w-[80%] xl:w-[75%] 2xl:w-[65%]`}>
                <header>
                    <div className=' text-2xl md:text-4xl lg:text-3xl xl:text-4xl font-mono font-bold mb-2  '>Sign Up to <GradientText>CodeHive</GradientText></div>
                    <div>Enter your details below</div>
                </header>

                <form onSubmit={handleSubmit} className=' flex flex-col gap-2' action="">

                    <div className=' relative flex items-center'>
                        <input
                            type="text"
                            placeholder='First Name'
                            autoComplete='off'
                            className=' border border-[#b1b1b1] rounded-lg p-3 pl-8 w-full focus: outline-[#d6927c]  bg-[#27272A]'
                            name='firstName'
                            onFocus={(e) => setFocusStates({ ...focusStates, [e.target.name]: true })}
                            onBlur={(e) => setFocusStates({ ...focusStates, [e.target.name]: false })}
                            value={form.firstName}
                            onChange={handleChange}
                        />
                        <IoMdMailUnread className={` absolute left-2 text-[#8f8f8f] ${focusStates.firstName ? "text-[#fb4c19]" : "text-[#b1b1b1]"}`} />
                    </div>

                    <div className=' relative flex items-center'>
                        <input
                            type="text"
                            placeholder='Last Name'
                            autoComplete='off'
                            className=' border border-[#b1b1b1] rounded-lg p-3 pl-8 w-full focus: outline-[#d6927c]  bg-[#27272A]'
                            name='lastName'
                            onFocus={(e) => setFocusStates({ ...focusStates, [e.target.name]: true })}
                            onBlur={(e) => setFocusStates({ ...focusStates, [e.target.name]: false })}
                            value={form.lastName}
                            onChange={handleChange}
                        />
                        <IoMdMailUnread className={` absolute left-2 text-[#8f8f8f] ${focusStates.lastName ? "text-[#fb4c19]" : "text-[#b1b1b1]"}`} />
                    </div>

                    <div className=' relative flex items-center'>
                        <input
                            type="text"
                            placeholder='Email Address'
                            autoComplete='off'
                            className=' border border-[#b1b1b1] rounded-lg p-3 pl-8 w-full focus: outline-[#d6927c]  bg-[#27272A]'
                            name='email'
                            onFocus={(e) => setFocusStates({ ...focusStates, [e.target.name]: true })}
                            onBlur={(e) => setFocusStates({ ...focusStates, [e.target.name]: false })}
                            value={form.email}
                            onChange={handleChange}
                        />
                        <IoMdMailUnread className={` absolute left-2 text-[#8f8f8f] ${focusStates.email ? "text-[#fb4c19]" : "text-[#b1b1b1]"}`} />
                    </div>

                    <div className=' relative flex items-center'>
                        <input
                            type={`${showPassword1 ? "text" : "password"}`}
                            placeholder='Password'
                            autoComplete='off'
                            className=' border border-[#b1b1b1] rounded-lg p-3 4 pl-8 w-full focus: outline-[#d6927c]  bg-[#27272A]'
                            name='password1'
                            onFocus={(e) => setFocusStates({ ...focusStates, [e.target.name]: true })}
                            onBlur={(e) => setFocusStates({ ...focusStates, [e.target.name]: false })}
                            value={form.password1}
                            onChange={handleChange}
                        />
                        <FaLock className={` absolute left-2 ${focusStates.password1 ? "text-[#fb4c19]" : "text-[#b1b1b1]"}`} />
                        <FaEye onClick={() => setShowPassword1(!showPassword1)} className={` absolute right-2 size-5 ${showPassword1 ? "block" : "hidden"} ${focusStates.password1 ? "text-[#fb4c19]" : "text-[#b1b1b1]"} cursor-pointer`} />
                        <FaEyeSlash onClick={() => setShowPassword1(!showPassword1)} className={` absolute right-2 size-5 ${showPassword1 ? "hidden" : "block"} ${focusStates.password1 ? "text-[#fb4c19]" : "text-[#b1b1b1]"} cursor-pointer`} />
                    </div>

                    <div className=' relative flex items-center'>
                        <input
                            type={`${showPassword2 ? "text" : "password"}`}
                            placeholder='Confirm Password'
                            autoComplete='off'
                            className=' border border-[#b1b1b1] rounded-lg p-3 4 pl-8 w-full focus: outline-[#d6927c]  bg-[#27272A]'
                            name='password2'
                            onFocus={(e) => setFocusStates({ ...focusStates, [e.target.name]: true })}
                            onBlur={(e) => setFocusStates({ ...focusStates, [e.target.name]: false })}
                            value={form.password2}
                            onChange={handleChange}
                        />
                        <FaLock className={` absolute left-2 ${focusStates.password2 ? "text-[#fb4c19]" : "text-[#b1b1b1]"}`} />
                        <FaEye onClick={() => setShowPassword2(!showPassword2)} className={` absolute right-2 size-5 ${showPassword2 ? "block" : "hidden"} ${focusStates.password2 ? "text-[#fb4c19]" : "text-[#b1b1b1]"} cursor-pointer`} />
                        <FaEyeSlash onClick={() => setShowPassword2(!showPassword2)} className={` absolute right-2 size-5 ${showPassword2 ? "hidden" : "block"} ${focusStates.password2 ? "text-[#fb4c19]" : "text-[#b1b1b1]"} cursor-pointer`} />
                    </div>

                    <button type='submit' className={` bg-[#fb4c19] rounded-3xl px-8 py-3 text-white `}>Sign Up</button>
                </form>
                <div className='flex w-full -my-4 items-center'>
                    <div className='w-full h-[1px] bg-white'></div>
                    <span className='px-2'>OR</span>
                    <div className='w-full h-[1px] bg-white'></div>
                </div>

                <GoogleAuthButton signIn={false} />
            </div>
            <OtpInputBox
                otp={otp}
                setOtp={setOtp}
                otpDialogOpen={otpDialogOpen}
                setOtpDialogOpen={setOtpDialogOpen}
                handleOtpSubmit={handleOtpSubmit}
            />
        </>
    )
}

export default SignUpForm
