import code from "@/assets/Home/code-about.png";
import { BorderBeam } from "../ui/border-beam";

const About = () => {
  return (
    <div
      id="about"
      className=" w-full min-h-[80vh] sm:min-h-[90vh] bg-[#000814] "
    >
      <div className=" w-full flex flex-col gap-6 py-5 sm:py-10 md:py-20 px-4 sm:px-12 lg:px-40">
        <div className=" w-full flex flex-col gap-4 items-center">
          <h1 className=" text-3xl sm:text-5xl mt-10 sm:mt-0 font-semibold font-mono">
            About CodeHive
          </h1>
          <div className=" text-gray-400 text-justify text-sm sm:text-base mb-6">
            At CodeHive, we believe in fostering a vibrant community of
            passionate learners, developers, and educators committed to pushing
            the boundaries of innovation. Our platform is designed to inspire
            creativity, encourage collaboration, and empower users to tackle
            complex challenges. Together, we're building a space where knowledge
            is shared, ideas flourish, and breakthroughs in the world of coding
            are made possible.
          </div>
        </div>
        <div className=" w-full h-full ">
          <div className="relative max-w-[800px] mx-auto rounded-md">
            <img
              className=" w-[800px] rounded-md shadow-[10px_-5px_50px_-5px] shadow-[#118AB2]"
              src={code}
              alt=""
            />
            <BorderBeam size={550} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
