import CodeBlock from "./CodeBlock";
import { codeblock1, codeblock2 } from "@/data/codeblocks";
import HomeBtn from "./HomeBtn";
import { useNavigate } from "react-router-dom";

const CodeSection = () => {
  const navigate = useNavigate();

  return (
    <div className=" w-full min-h-[calc(100vh-125px)] sm:min-h-[calc(100vh-75px)] bg-[#000814] border-b border-b-slate-700 ">
      <div className=" w-full h-full flex flex-col lg:gap-y-20 py-5 sm:py-10 md:py-20 px-4 sm:px-12 lg:px-40">
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between">
          <div className="w-full lg:w-[55%] my-10 lg:my-0">
            <CodeBlock
              codeColor={"text-yellow-rich"}
              codeblock={codeblock1}
              gradient={"from-purple-600 via-orange-400 to-gray-100"}
            />
          </div>
          <div className=" lg:w-[40%] flex flex-col gap-y-5 lg:gap-y-0 justify-around">
            <h2 className=" text-3xl sm:text-5xl font-semibold font-mono">
              Get Started
            </h2>
            <p className="text-gray-400 text-sm sm:text-base text-justify">
              Ready to revolutionize the way you learn and tech coding? Sign up
              for CodeHive today and discover the power of collaborative
              programming.
            </p>
            <div className="cursor-pointer w-fit" onClick={() => navigate("/auth")}>
              <HomeBtn text={"Join Now"} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between">
          <div className="lg:w-[40%] flex flex-col gap-y-5 lg:gap-y-0 justify-around">
            <h2 className=" text-3xl sm:text-5xl font-semibold font-mono">
              Try It Now
            </h2>
            <p className="text-gray-400 text-sm sm:text-base text-justify">
              Experience the future of collaborative coding with CodeHive. Our
              user friendly platform makes it easy for students and teachers to
              work together in real-time.
            </p>
            <div className="cursor-pointer w-fit" onClick={() => navigate("/auth")}>
              <HomeBtn text={"Try for free"} />
            </div>
          </div>
          <div className="w-full lg:w-[55%] my-10 lg:my-0">
            <CodeBlock
              codeColor={"text-blue-200"}
              codeblock={codeblock2}
              gradient={"from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSection;
