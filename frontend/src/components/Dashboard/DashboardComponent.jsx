import Particles from "../ui/particles";
import RoomHistory from "./RoomHistory";
import SelectLanguage from "./SelectLanguage";

const DashboardComponent = () => {
  return (
    <div className="relative flex min-h-[100svh] max-h-fit flex-col items-center justify-center border bg-background md:shadow-xl z-30 overflow-y-scroll overflow-x-hidden">
      <Particles
        className="absolute inset-0"
        quantity={300}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-y-6 max-w-11/12">
          <SelectLanguage />
          <RoomHistory />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
