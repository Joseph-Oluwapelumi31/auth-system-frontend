import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import { User } from "../types/user";
import { handleApiError } from "../utils/handleApiError";
import { LoginSignUpResponse } from "../types/SignupLoginresponse";

interface errorState {
    email: boolean;
    password: boolean;
    username: boolean;
}



export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, SetuserName] = useState<string>("");
    const [loading , setLoading] = useState<boolean>(false);
    const [errors , setErrors] = useState<errorState>({email: false , password: false, username: false});
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (field: keyof errorState, setter: React.Dispatch<React.SetStateAction<string>> ) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrors((prev) => ({ ...prev, [field]: false }));
    };
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        const newErrors = {email: !email , password: !password, username: !username};
        setErrors(newErrors);
        if(newErrors.email || newErrors.password){
          setLoading(false);
          return toast.error("Please fill all the fields");
        } 
        

        // Signup logic to be implemented
        try {
            const res = await API.post<LoginSignUpResponse>("/auth/signup", {username, email, password})
            
            login(res.data.user);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
            toast.success("Signup successful");
        } catch (error: unknown) {
            handleApiError(error);
        }finally {
            setLoading(false);
        }
    }

    return(
        <>
            <form action="" onSubmit={handleSubmit} className="flex flex-col p-4 items-center justify-center gap-4">
                <h1 className="font-semibold mb-4 text-xl" >Sign up with email</h1>
                <InputField
                type="text"
                placeholder="userName"
                value={username}
                onChange={handleChange("username", SetuserName)}
                error={errors.username}
                />

                <InputField 
                type="email"
                placeholder="email"
                value={email}
                onChange={handleChange("email", setEmail)}
                error={errors.email}
                />
                <PasswordInput
                placeholder="password"
                value={password}
                onChange={handleChange("password", setPassword)}
                error={errors.password}
                />
                            
                <SubmitButton loading={loading}>
                  Continue
                </SubmitButton>
            </form>
            <p className="text-center ">Already have an account? <span className="text-violet font-semibold text-violet-500 border-b-2 hover:text-violet-600 border-b-violet-500"><Link to={'/login'}>Log in</Link></span></p>
        </>
    )
}