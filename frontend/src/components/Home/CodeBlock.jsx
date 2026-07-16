import { BorderBeam } from "../ui/border-beam";
import TypingAnimation from "./TypingAnimation";

const CodeBlock = ({ codeColor, codeblock, gradient }) => {
  return (
    <div>
      <div className="rounded-md flex py-5 relative  border-[1px] border-slate-600  shadow-lg">
        <BorderBeam borderWidth={1} size={400} duration={5} />
        <div
          className={`absolute w-[372.95px] h-[257.05px] rounded-full left-[calc(50%-186.475px-76.53px)] top-[calc(50%-128.525px)] bg-gradient-to-r ${gradient}  opacity-30 blur-[34px] transform `}
        ></div>

        <div className="text-center flex flex-col w-[10%] text-[#838894] font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 text-sm sm:text-base`}
        >
          <TypingAnimation
            textColor={codeColor}
            codeblock={codeblock}
            typingSpeed={50}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
