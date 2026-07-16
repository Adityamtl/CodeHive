import laptop from "@/assets/Home/laptop-hero.png";
import HomeBtn from "./HomeBtn";
import GradientText from "../GradientText";
import GridPattern from "../ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      id="home"
      className=" w-full min-h-[calc(100vh-125px)] sm:min-h-[calc(100vh-75px)] bg-[#000814] border-b border-b-slate-700 "
    >
      <GridPattern
        numSquares={30}
        maxOpacity={0.2}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className=" w-full h-full flex flex-col md:flex-row  items-center justify-around md:justify-between py-10 sm:py-10 md:py-20 px-4 sm:px-12 lg:px-40">
        <div className=" w-full md:w-3/5 ">
          <div className=" w-full md:w-[90%] flex flex-col items-start gap-6 sm:gap-8 ">
            <h1 className=" text-3xl sm:text-5xl font-semibold font-mono">
              Welcome to <GradientText>CodeHive</GradientText>
            </h1>
            <div className="text-gray-400 text-sm sm:text-base text-justify">
              Welcome to our collaborative code editor platform, where students
              and teachers can come together to create, compile and share their
              code with everyone in a dynamic, interactive environment.
            </div>
            <div className="cursor-pointer w-fit" onClick={() => navigate("/auth")}>
              <HomeBtn text={"Get Started"} />
            </div>
          </div>
        </div>
        <div className="relative mt-10">
          <img className=" w-[350px] md:w-[500px]" src={laptop} alt="laptop" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
