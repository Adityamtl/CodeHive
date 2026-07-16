import { useEffect, useState } from 'react'

const BlackCircle = () => {
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
        <div
            className={` size-[460px] md:size-[600px] lg:size-[900px] xl:size-[850px] 2xl:size-[850px] bg-[#28272e] rounded-full absolute -top-72 left-[-360px] transition-transform duration-[500] ease-in-out transform ${isMounted ? 'translate-x-0 translate-y-0 transition-all duration-[500ms] animate-bounce ' : '-translate-x-[50%] -translate-y-[50%] '}`}
        >
        </div>
    )
}

export default BlackCircle
