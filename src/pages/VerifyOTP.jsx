import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // get email from previous page
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter the OTP");
    }
    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      console.log(res.data);

      // move to reset password page
      navigate("/new-password", { state: { email } });
      toast.success("OTP verified successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);

      toast.error(error.response?.data?.error || "Something went wrong");}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 items-center justify-center gap-4"
    >
      <h1 className="font-semibold mb-4 text-xl">Verify OTP</h1>

      <input
        placeholder="Enter OTP"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full max-w-80 px-4 py-3 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-violet-500"
      />
     <button className="w-full max-w-80 h-15 text-center bg-violet-600 cursor-pointer hover:bg-violet-500 text-white font-semibold rounded-sm">Continue</button>

     
    </form>
  );
}
