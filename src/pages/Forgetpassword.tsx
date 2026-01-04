import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { handleApiError } from "../utils/handleApiError";

interface errorType {
    email: boolean;
}

export default function Forgetpassword() {
    const [email, setEmail] = useState<string>("");
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<errorType>({email: false});

    const navigate = useNavigate();

    const handleChange = (field: keyof errorType, setter: React.Dispatch<React.SetStateAction<string>> ) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError((prev) => ({ ...prev, [field]: false }));
    };

    const handlesubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
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
            navigate("/verify-otp", {state: { email}});
            toast.success("OTP sent to your email");
        } catch (error:unknown) {
            handleApiError(error, 'Forgot Password Error');
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