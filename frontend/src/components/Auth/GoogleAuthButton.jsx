import { FcGoogle } from "react-icons/fc";
import ShineBorder from "../ui/shine-border";
import { useGoogleLogin } from "@react-oauth/google";
import { oAuthLogin } from "@/api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserObj } from "@/features/Profile/profileSlice";

const GoogleLoginButton = ({ signIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const FetchUserData = async (response) => {
    try {
      if (response.code) {
        const code = response.code
        const data = await oAuthLogin(code)

        if (!data?.success) {
          toast.error(data?.message || "Google authentication failed", {
            autoClose: 3000,
          });
          return;
        }

        dispatch(setUserObj({
          _id: data?.user?._id ?? "",
          firstName: data?.user?.firstName ?? "",
          lastName: data?.user?.lastName ?? "",
          email: data?.user?.email ?? "",
          about: data?.user?.about ?? "",
          imageUrl: data?.user?.imageUrl ?? "",
          googleId: data?.user?.googleId ?? "",
          createdAt: data?.user?.createdAt ?? "",
          rooms: data?.user?.rooms ?? [],
        }));

        navigate("/");
      }
    } catch (error) {
      console.log("Error in responseGoogle: ", error);
      toast.error(error?.response?.data?.message || "Google authentication failed", {
        autoClose: 3000,
      });
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: FetchUserData,
    onError: (error) => {
      console.log("Login Failed:", error);
      toast.error("Google login was cancelled or failed", {
        autoClose: 3000,
      });
    },
    flow: "auth-code",
  })

  return (
    <div onClick={() => googleLogin()}>
      <ShineBorder
        className="flex w-full justify-center items-center gap-x-2 bg-[#27272A] rounded-3xl px-8 py-3 min-h-fit cursor-pointer" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <FcGoogle className="text-xl" />
        <span className="text-lg">{signIn ? "Login" : "Signup"} with Google</span>
      </ShineBorder>
    </div>
  );
};

const GoogleAuthButton = ({ signIn }) => {
  const googleClientId = import.meta.env.VITE_Google_Client_id;

  if (!googleClientId) {
    return null;
  }

  return <GoogleLoginButton signIn={signIn} />;
};

export default GoogleAuthButton;
