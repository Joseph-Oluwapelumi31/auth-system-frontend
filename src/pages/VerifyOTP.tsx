import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { AxiosError } from "axios";
import { handleApiError } from "../utils/handleApiError";

interface OTPErrorState {
    otp: boolean;
}

interface VerifyOTPResponse {
    message: string;
    success: boolean;
}

export default function VerifyOTP() {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error , setError] = useState<OTPErrorState>({otp: false});
  const navigate = useNavigate();
  const location = useLocation();

  // get email from previous page
  const email = location.state?.email;

  const handleChange = (field, setter) => (e) => {
      setter(e.target.value);
      setError((prev) => ({ ...prev, [field]: false }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newError = {otp: !otp};
        setError(newError);
        if(newError.otp){
          setLoading(false);
          return toast.error("Please fill all the fields");
        } 

    
    try {
      const res = await API.post<VerifyOTPResponse>("/auth/verify-otp", {
        email,
        otp,
      });

      console.log(res.data);

      // move to reset password page
      navigate("/new-password", { state: { email } });
      toast.success("OTP verified successfully");
    } catch (err: unknown) {
      handleApiError(err, "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 items-center justify-center gap-4"
    >
      <h1 className="font-semibold mb-4 text-xl">Verify OTP</h1>
      <InputField 
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleChange("otp", setOtp)}
        error={error.otp}
      />
      
      <SubmitButton loading={loading}>
        {loading ? "Verifying OTP" : "Verify OTP"}
      </SubmitButton>
     
    </form>
  );
}
