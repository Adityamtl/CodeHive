import axios from "axios";

const BASE_URL = import.meta.env.VITE_B_URL;

// ─── Token Management ────────────────────────────────────────────────────────
let accessToken = null;
const AUTH_CHANGED_EVENT = "codehive-auth-changed";

const notifyAuthChanged = () => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
    }
};

export const setAccessToken = (token) => {
    accessToken = token;
    notifyAuthChanged();
};

export const getAccessToken = () => {
    return accessToken;
};

export const onAuthChanged = (handler) => {
    window.addEventListener(AUTH_CHANGED_EVENT, handler);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, handler);
};

// ─── Axios Instance with Auto-Refresh Interceptor ────────────────────────────

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isUnauthorized =
            error?.response?.status === 401 &&
            !originalRequest._retry; // avoid infinite retry loops

        if (isUnauthorized) {
            if (isRefreshing) {
                // Queue any concurrent requests while refresh is in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh endpoint — gets new accessToken
                const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });
                const newToken = refreshResponse.data.accessToken;
                setAccessToken(newToken);
                
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                processQueue(null, newToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                setAccessToken(null); // Clear token on failed refresh
                // Refresh failed — user needs to log in again
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const oAuthLogin = async (code) => {
    const response = await axiosInstance.get(`/auth/google`, {
        params: { code },
    });
    if (response.data.success && response.data.accessToken) {
        setAccessToken(response.data.accessToken);
    }
    return response.data;
};

export const sendOtp = async (email) => {
    try {
        const response = await axiosInstance.post(`/auth/sendOtp`, { email });
        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        // 409 = user already exists
        if (error?.response?.status === 409) {
            return { success: false, userExists: true, message: "User already exists" };
        }
        return false;
    }
};

export const signUp = async (data, otp) => {
    try {
        const response = await axiosInstance.post(`/auth/signUp`, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password1,
            otp: otp,
        });

        if (response.data.success === true) {
            if (response.data.accessToken) {
                setAccessToken(response.data.accessToken);
            }
            return response.data;
        }
        return false;
    } catch {
        console.log("Error in signup after submitting Otp");
        return false;
    }
};

export const login = async (data) => {
    try {
        const response = await axiosInstance.post(`/auth/login`, {
            email: data.email,
            password: data.password,
        });

        if (response.data.success === true) {
            if (response.data.accessToken) {
                setAccessToken(response.data.accessToken);
            }
            return response.data;
        }
        return false;
    } catch (error) {
        const message = error?.response?.data?.message;
        if (message === "Unauthorize") {
            return {
                success: false,
                message: "Don't have an account yet. Please sign up first",
            };
        }
        if (message === "InvalidPassword") {
            return {
                success: false,
                message: "Password is incorrect",
            };
        }
        return { success: false, message: "Error in login" };
    }
};

export const getUser = async () => {
    try {
        const response = await axiosInstance.get(`/user/getUser`);
        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        if (error?.response?.status === 401) {
            // Attempt to fetch again if token was expired but successfully refreshed.
            // Actually the interceptor handles retry, so if we still get 401 here, refresh failed.
            return false;
        }
        console.log("Error in getUser: ", error?.message);
        return false;
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.get(`/auth/logout`);
        setAccessToken(null);
        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch {
        console.log("Error in logout");
        return false;
    }
};

// ─── User ─────────────────────────────────────────────────────────────────────

export const updateProfile = async (data) => {
    try {
        const response = await axiosInstance.put(`/user/updateProfile`, { data });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in updateProfile: ", error);
        return false;
    }
};

export const updatePassword = async (data) => {
    try {
        const response = await axiosInstance.put(`/user/updatePassword`, {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch {
        console.log("Error in updatePassword");
        return false;
    }
};

export const deleteUser = async () => {
    try {
        const response = await axiosInstance.delete(`/user/deleteUser`);
        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch {
        console.log("Error in deleteUser");
        return false;
    }
};

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactUs = async (data) => {
    try {
        const response = await axiosInstance.post(`/contact/contactForm`, {
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
            phone: data.phone,
            message: data.message,
        });

        if (response.data.success === true) {
            return response.data.data;
        }
        return false;
    } catch (error) {
        console.log("Error in contactUs", error);
        return false;
    }
};

// ─── Rooms ────────────────────────────────────────────────────────────────────

export const createRoom = async (data) => {
    try {
        const response = await axiosInstance.post(`/room/createRoom`, {
            roomName: data.roomName,
            language: data.language,
            isVisible: data.isVisible,
            isMsgEnable: data.isMsgEnable,
        });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in createRoom: ", error);
        return false;
    }
};

export const joinRoom = async (roomId) => {
    try {
        const response = await axiosInstance.post(`/room/joinRoom`, { roomId });

        if (response.data.success === true) {
            return response.data;
        }
        return { success: false, message: "Unable to join room" };
    } catch (error) {
        console.log("Error in joinRoom: ", error);
        const message = error?.response?.data?.message ?? "Unable to join room";
        return { success: false, message };
    }
};

export const getMembers = async (roomId) => {
    try {
        const response = await axiosInstance.post(`/room/getMembers`, { roomId });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in getMembers", error);
        return false;
    }
};

export const getRoomDetails = async (roomId) => {
    try {
        const response = await axiosInstance.post(`/room/getRoomDetails`, { roomId });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in getRoomDetails: ", error);
        return false;
    }
};

export const deleteRoom = async (roomId) => {
    try {
        const response = await axiosInstance.post(`/room/deleteRoom`, { roomId });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in deleteRoom: ", error);
        return false;
    }
};

// ─── Messages ─────────────────────────────────────────────────────────────────

export const getMessages = async (roomId) => {
    try {
        const response = await axiosInstance.post(`/message/getMessages`, { roomId });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in getMessages: ", error);
        return false;
    }
};

// ─── Code ─────────────────────────────────────────────────────────────────────

export const compileCode = async (data) => {
    try {
        const { input, code, language } = data;

        // External Piston API — use plain axios (no auth needed)
        const response = await axios.post(`https://emkc.org/api/v2/piston/execute`, {
            language: language,
            version: "*",
            files: [{ content: code }],
            stdin: input,
            timeout: 3,
        });

        if (response.data.run.stderr) {
            return response.data.run.stderr;
        } else if (response.data.run.signal === "SIGKILL") {
            return "Time Limit Exceeded";
        } else if (response.data.run.code === 0) {
            return response.data.run.stdout;
        } else if (response.data.run.code !== 0) {
            return response.data.run.stdout;
        }

        return false;
    } catch (error) {
        console.log("Error in compileCode: ", error);
        return false;
    }
};

export const getCode = async (roomId) => {
    try {
        const response = await axiosInstance.post(`/code/getCode`, { roomId });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in getCode: ", error);
        return false;
    }
};

export const getRemoteCode = async (data) => {
    try {
        const response = await axiosInstance.post(`/code/getRemoteCode`, {
            roomId: data.roomId,
            userId: data.userId,
        });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in getRemoteCode: ", error);
        return false;
    }
};

export const reviewCode = async (data) => {
    try {
        const response = await axiosInstance.post(`/code/review`, {
            code: data.code,
            language: data.language,
        });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in reviewCode: ", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Unable to review code",
        };
    }
};

// ─── Password Reset ───────────────────────────────────────────────────────────

export const forgotMail = async (email) => {
    try {
        const response = await axiosInstance.post(`/auth/forgotPass`, { email });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in forgotMail: ", error);
        return false;
    }
};

export const verifyToken = async (token) => {
    try {
        const response = await axiosInstance.post(`/auth/verifyToken`, { token });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        const message = error?.response?.data?.error?.name;
        if (message === "TokenExpiredError") {
            return { success: false, message };
        }
        if (message === "JsonWebTokenError") {
            return { success: false, message };
        }
        return { success: false, message: "Error in verifyToken" };
    }
};

export const resetPassword = async (data) => {
    try {
        const response = await axiosInstance.post(`/auth/resetPassword`, {
            password: data.password,
            email: data.email,
            token: data.token,       // now required by the guarded backend endpoint
        });

        if (response.data.success === true) {
            return response.data;
        }
        return false;
    } catch (error) {
        console.log("Error in resetPassword: ", error);
        return false;
    }
};
