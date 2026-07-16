import logo from "@/assets/Auth/CodeHive Logo.png";

const Footer = () => {
  return (
    <div className=" w-full h-fit py-8 flex flex-wrap justify-evenly items-center gap-6 border-y border-y-slate-700 text-sm text-gray-500">
      <div className=" min-w-40 flex flex-col items-center gap-2">
        <img className=" size-20 " src={logo} alt="logo" />
        <span>&copy;2024 CodeHive Inc.</span>
        <span>All rights reserved</span>
      </div>

      <div className=" min-w-24 flex flex-col gap-2">
        <span className=" font-semibold text-gray-400">Company</span>
        <span>About</span>
        <span>Career</span>
        <span>Contact</span>
      </div>

      <div className=" min-w-24 flex flex-col gap-2">
        <span className=" font-semibold text-gray-400">Resources</span>
        <span>Tutorials</span>
        <span>Blog</span>
        <span>FAQ</span>
      </div>

      <div className=" min-w-24 flex flex-col gap-2">
        <span className=" font-semibold text-gray-400">Support</span>
        <span>Help center</span>
        <span>Feedback</span>
        <span>Status</span>
      </div>
    </div>
  );
};

export default Footer;
