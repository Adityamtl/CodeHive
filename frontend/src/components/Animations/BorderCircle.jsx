import {useState,useEffect} from 'react'

const BorderCircle = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Trigger the transition on mount
        setIsMounted(true);
        
        // Optionally, reset isMounted after some time to allow the transition on page reload
        const timeout = setTimeout(() => {
            setIsMounted(false);
            setTimeout(() => setIsMounted(true), 10); // Small delay to re-trigger the transition
        }, 0); // Immediately reset to re-trigger

        return () => clearTimeout(timeout);
    }, []);

  return (
    <>
        <div
            className={` md:size-[620px] lg:size-[920px] xl:size-[870px] 2xl:size-[870px] bg-gray-500 border border-[#b1b1b1] rounded-full absolute -top-72 left-[-360px] transition-transform  ease-linear transform ${isMounted ? 'translate-x-0 translate-y-0 transition-all duration-[700ms] animate-bounce2 ' : '-translate-x-[50%] -translate-y-[50%] '}`}
        >
        </div>
    </>
  )
}

export default BorderCircle
