import { useDispatch } from "react-redux";
import { setUserObj } from "../features/Profile/profileSlice.js";
import { useEffect, useState } from "react";
import { getUser, onAuthChanged } from "../api/user.js";

export function useFetchUser() {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            setIsLoading(true);

            const res = await getUser();
            if (!res) {
                if (isMounted) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                }
                return;
            }

            const data = {
                _id: res?.user?._id ?? "",
                firstName: res?.user?.firstName ?? "",
                lastName: res?.user?.lastName ?? "",
                email: res?.user?.email ?? "",
                about: res?.user?.about ?? "",
                imageUrl: res?.user?.imageUrl ?? "",
                googleId: res?.user?.googleId ?? "",
                createdAt: res?.user?.createdAt ?? "",
                rooms: res?.user?.rooms ?? [],
            };

            if (isMounted) {
                setIsAuthenticated(true);
                dispatch(setUserObj(data));
                setIsLoading(false);
            }
        };

        fetchUser();
        const removeAuthListener = onAuthChanged(fetchUser);

        return () => {
            isMounted = false;
            removeAuthListener();
        };
    }, [dispatch]);

    return { isAuthenticated, isLoading };
}
