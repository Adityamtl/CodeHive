import {useState, useEffect} from 'react'

const WhiteCircle = () => {
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
            className={` size-12 md:size-16 lg:size-8 bg-[#fb4c19] lg:bg-white absolute rounded-full right-[20px] md:right-[55px] lg:left-[250px] xl:left-[260px] top-[205px] md:top-[238px] lg:top-[100px] xl:top-[90px] transition-transform duration-[500] ease-in-out transform ${isMounted ? 'translate-x-0 translate-y-0 transition-all duration-[500ms] animate-curve ' : '-translate-x-[50%] -translate-y-[50%] '} `}>
        </div>
    </>
  )
}

export default WhiteCircle
