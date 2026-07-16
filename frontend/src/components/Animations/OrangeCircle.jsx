import { useEffect, useState } from 'react'

const OrangeCircle = () => {
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
            className={` lg:size-28 xl:size-24 2xl:size-24 bg-[#fb4c19] absolute rounded-full top-[125px] 2xl:top-[160px] left-[350px] 2xl:left-[350px] transition-transform duration-[450ms] ease-in transform ${isMounted ? " translate-x-0 translate-y-0 transition-all duration-[800ms] animate-bounce2" : " -translate-y-[90%]"}`}>
        </div>
    </>
  )
}

export default OrangeCircle
