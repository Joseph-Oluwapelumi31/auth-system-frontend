import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";


export default function Forgetpassword() {
    const [email, setEmail] = useState("");
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();
    const handlesubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        if(!email){
            return toast.error("Please enter your email");
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
                <input
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-80 h-15 px-4 py-6 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-violet-500 focus:border-gray-500"/>
                <SubmitButton loading={loading}>
                  {loading ? "Sending OTP" : "Send OTP"}
                </SubmitButton>
            </form>
        </>
    )
}