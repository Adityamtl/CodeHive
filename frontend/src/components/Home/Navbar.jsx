import logo from "@/assets/Auth/CodeHive Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className=" w-full h-16 flex justify-between items-center bg-[#000814] border-b border-b-slate-700 px-4 sm:px-12 lg:px-36 bg-opacity-50 ">
      <div className=" flex items-center">
        <img className=" size-12 " src={logo} alt="logo" />
        <div className=" text-white font-bold text-2xl">CodeHive</div>
      </div>

      <div className=" flex items-center gap-4 font-mono lg:gap-8">
        <div className=" text-gray-400 hover:text-gray-200 cursor-pointer hidden md:block"
          onClick={() => scrollToSection("home")}
        >
            Home
        </div>
        <div className=" text-gray-400 hover:text-gray-200 cursor-pointer hidden md:block"
          onClick={() => scrollToSection("features")}
        >
            Features
        </div>
        <div className=" text-gray-400 hover:text-gray-200 cursor-pointer hidden md:block"
          onClick={() => scrollToSection("about")}
        >
            About
        </div>
        <button className="relative flex py-2 px-4 sm:px-6 items-center justify-center overflow-hidden bg-white text-black font-semibold font-mono rounded-full transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-yellow-rich before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56" onClick={() => navigate("/auth")}>
          <span className="relative z-10">Join Now</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
