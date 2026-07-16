import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { forgotMail } from "@/api/user";

const EmailField = ({ setDialogOpen }) => {
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    if(!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    const toastId = toast.loading("Sending email...");
    
    const res = await forgotMail(email);

    if (!res) {
      toast.update(toastId, {render: "An error occured", type: "error", isLoading: false, autoClose: 3000});
      return;
    }

    setDialogOpen(false);
    toast.update(toastId, {render: "An email has been sent to reset password", type: "success", isLoading: false, autoClose: 3000});
  }

  return (
    <div className="flex flex-col justify-between">
      
      <p className="text-gray-400">
        Enter your registered email to receive a link.
      </p>
      <input
        className="w-full rounded-md bg-[#121212] p-2 border border-white/30"
        type="email"
        placeholder="Enter Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleEmailSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default EmailField;
