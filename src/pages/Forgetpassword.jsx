import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";


export default function Forgetpassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handlesubmit = async (e) =>{
        e.preventDefault();
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
                <button className="w-full max-w-80 h-15 text-center bg-violet-600 cursor-pointer hover:bg-violet-500 text-white font-semibold rounded-sm">Continue</button>
            </form>
        </>
    )
}