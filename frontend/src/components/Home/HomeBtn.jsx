const HomeBtn = ({ text, className }) => {
  return (
    <div>
      <a className={`relative inline-flex items-center justify-center p-4 px-6 py-2 overflow-hidden font-medium  transition duration-300 ease-out border-[3px] border-yellow-rich bg-yellow-rich rounded-md shadow-md group ${className}`}>
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center font-semibold font-mono w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
          {text}
        </span>
        <span className="relative invisible">{text}</span>
      </a>
    </div>
  );
};

export default HomeBtn;
