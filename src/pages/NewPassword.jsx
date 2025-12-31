import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill all the fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await API.post("/auth/resetpassword", { email, newPassword: password });
      navigate("/login");
      toast.success("Password reset successfully!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Something went wrong");}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 items-center justify-center gap-4"
    >
      <h1 className="font-semibold mb-4 text-xl">Set New Password</h1>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-80 px-4 py-3 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-violet-500"
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full max-w-80 px-4 py-3 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-violet-500"
      />
     <button className="w-full max-w-80 h-15 text-center bg-violet-600 cursor-pointer hover:bg-violet-500 text-white font-semibold rounded-sm">Continue</button>
    </form>
  );
}
