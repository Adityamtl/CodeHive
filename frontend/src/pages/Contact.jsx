import Footer from "@/components/Home/Footer";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";
import ContactUsForm from "@/components/Contact/ContactUsForm";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@codehive.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Siliguri, West Bengal-734001",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const Contact = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-10 justify-center bg-[#000814] md:px-10 py-20 mx-auto">
        <div className="flex mx-auto md:mx-0 h-fit w-5/6 sm:w-2/3 md:w-[40%] lg:w-1/3 flex-col gap-6 rounded-xl p-4 lg:p-6 border border-gray-600 bg-[#101622]">
          {contactDetails.map((ele, i) => {
            let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
            return (
              <div
                className="flex flex-col gap-[2px] p-3 text-sm"
                key={i}
              >
                <div className="flex flex-row items-center gap-3">
                  <Icon className="size-4 sm:size-6" />
                  <h1 className="sm:text-lg text-gray-300 font-semibold">
                    {ele?.heading}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">{ele?.description}</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-500">{ele?.details}</p>
              </div>
            );
          })}
        </div>
        <div className="w-5/6 sm:w-2/3 md:w-[70%] lg:w-3/5 mx-auto lg:mx-0">
          <ContactUsForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
