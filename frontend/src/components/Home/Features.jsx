import GridPattern from "../ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import feature1 from "@/assets/Home/feature1.png";
import feature2 from "@/assets/Home/feature2.png";
import feature3 from "@/assets/Home/feature3.png";

const Features = () => {
  return (
    <div
      id="features"
      className="relative w-full min-h-[95vh] bg-[#000814] border-b border-b-slate-700"
    >
      <GridPattern
        numSquares={30}
        maxOpacity={0.2}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className=" w-full py-5 sm:py-10 md:py-20 px-4 sm:px-12 lg:px-40">
        <div className=" w-full flex flex-col gap-4 items-center gap-y-8 mb-10">
          <h1 className=" text-3xl sm:text-5xl font-semibold font-mono mt-6 sm:mt-0">
            Features Overview
          </h1>
          <div className=" text-gray-400 text-justify text-sm sm:text-base ">
            CodeHive offers real-time collaborative coding, allowing multiple
            users to write and edit code together seamlessly. Compile code
            directly in the editor, track changes, and chat with team members
            for enhanced collaboration, all in one platform designed for
            efficient teamwork and productivity.
          </div>
        </div>
        <div className="w-full flex flex-col items-center md:flex-row md:justify-around gap-0  ">
          <div className="z-50">
            <img
              className="w-[50%] mx-auto max-w-10/12 md:w-[180px] lg:w-[220px] xl:w-[340px] -my-4 md:mt-6"
              src={feature1}
              alt=""
            />
          </div>
          <div className="z-50">
            <img
              className=" w-[50%] mx-auto max-w-10/12 md:w-[180px] lg:w-[220px] xl:w-[320px] -my-4 md:mt-6"
              src={feature2}
              alt=""
            />
          </div>
          <div className="z-50">
            <img
              className="w-[50%] mx-auto max-w-10/12 md:w-[180px] lg:w-[220px] xl:w-[340px] -my-4 md:mt-6"
              src={feature3}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
