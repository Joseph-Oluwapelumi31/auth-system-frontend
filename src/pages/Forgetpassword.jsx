import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";


export default function Forgetpassword() {
    const [email, setEmail] = useState("");
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState({email: false});

    const navigate = useNavigate();

    const handleChange = (field, setter) => (e) => {
      setter(e.target.value);
      setError((prev) => ({ ...prev, [field]: false }));
    };

    const handlesubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const newError = {email: !email};
        setError(newError);
        if(newError.email){
          setLoading(false);
          return toast.error("Please fill all the fields");
        } 

        
        try {
            const res = await API.post("/auth/forgotpassword", {email})
            console.log(res.data);
            // await Promise.resolve();
            navigate("/verify-otp", {state: { email}});
            toast.success("OTP sent to your email");
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.error || "Something went wrong");
        }finally {
            setLoading(false);
        }
        

    }

    return(
        <>
            <form action="" onSubmit={handlesubmit} className="flex flex-col p-4 items-center justify-center gap-4">
                <h1 className="font-semibold mb-4 text-xl" >Forget Password</h1>
                <InputField
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={handleChange("email", setEmail)}
                    error={error.email}
                />
                <SubmitButton loading={loading}>
                  {loading ? "Sending OTP" : "Send OTP"}
                </SubmitButton>
            </form>
        </>
    )
}