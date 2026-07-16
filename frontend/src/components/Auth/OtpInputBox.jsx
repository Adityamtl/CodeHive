import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";

const OtpInputBox = ({
  otp,
  setOtp,
  otpDialogOpen,
  setOtpDialogOpen,
  handleOtpSubmit,
}) => {
  const handleDialogChange = () => {
    setOtpDialogOpen(false);
    setOtp("");
  };
  return (
    <Dialog open={otpDialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-[95%] rounded-lg sm:max-w-[425px] border-gray-600">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            Enter the OTP sent to your email address
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
          >
            <InputOTPGroup>
              {Array(6)
                .fill("")
                .map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="sm:size-14 border-gray-600"
                  />
                ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter className={"flex flex-row justify-center"}>
          <Button
            className="max-w-[270px] w-[200px] sm:w-auto"
            onClick={handleOtpSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OtpInputBox;
