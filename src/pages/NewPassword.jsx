import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ password: false, confirmPassword: false });
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);


  const handleChange = (field, setter) => (e) => {
      setter(e.target.value);
      setErrors((prev) => ({ ...prev, [field]: false }));
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {confirmPassword: !confirmPassword , password: !password};
        setErrors(newErrors);
        if(newErrors.confirmPassword || newErrors.password){
          setLoading(false);
          return toast.error("Please fill all the fields");
        } 
    

    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    try {
      await API.post("/auth/resetpassword", { email, newPassword: password });
      navigate("/login");
      toast.success("Password reset successfully!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 items-center justify-center gap-4"
    >
      <h1 className="font-semibold mb-4 text-xl">Set New Password</h1>
      <PasswordInput
        placeholder="New Password"
        value={password}
        onChange={handleChange("password", setPassword)}
        error={errors.password}
      />
      <PasswordInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={handleChange("confirmPassword", setConfirmPassword)}
        error={errors.confirmPassword}
      />
      <SubmitButton loading={loading}>
        {loading ? "Resetting Password" : "Reset Password"}
      </SubmitButton>
    </form>
  );
}
