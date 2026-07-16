import { MagicCard } from "../ui/magic-card";

const Language = ({ logo, name }) => {
  return (
    <div className="flex justify-center">
      <div className="p-[1px] w-fit rounded-lg relative inline-block">
        <div className="absolute inset-0 rounded-md animate-border-hover pointer-events-none"></div>
        <MagicCard
          className="flex flex-col items-center py-3 max-w-[130px] min-w-[100px] w-fit sm:w-[130px] dark:bg-black/5 dark:hover:bg-black/100 border-[1px] border-slate-500 hover:border-none rounded-md cursor-pointer transition-all duration-300"
          gradientColor={"#363636"}
        >
          <div className="max-w-10">
            <img src={logo} className="aspect-square object-cover w-7 sm:w-10" alt={name} />
          </div>
          <p className="text-center mt-1 text-white">{name}</p>
        </MagicCard>
      </div>
    </div>
  );
};

export default Language;
