import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import { handleApiError } from "../utils/handleApiError";
import {LoginSignUpResponse} from "../types/SignupLoginresponse"  

interface errorState {
    email: boolean;
    password: boolean;
}

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors , setErrors] = useState<errorState>({email: false , password: false});
    const [loading , setLoading] = useState<boolean>(false);
    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (field: keyof errorState, setter: React.Dispatch<React.SetStateAction<string>> ) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrors((prev) => ({ ...prev, [field]: false }));
    };


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);
        const newErrors = {email: !email , password: !password};
        setErrors(newErrors);
        if(newErrors.email || newErrors.password){
          setLoading(false);
          return toast.error("Please fill all the fields");
        } 

        try {
          const res= await API.post<LoginSignUpResponse>("/auth/login", {email, password})

          login(res.data.user);           

          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");

        } catch (error) {
            handleApiError(error, "Login failed");
        }finally {
          setLoading(false);
        }
      }


    return(
        <>
            <form action="" onSubmit={handleSubmit} className="flex flex-col p-4 items-center justify-center gap-4">
                <h1 className="font-semibold mb-4 text-xl" >Log in</h1>
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
                  {loading ? "Logging in" : "Log In"}
                </SubmitButton>                

                <Link to={'/forgot-password'} className="text-sm text-gray-600 hover:text-gray-800 text-center ">Forgot password?</Link>
            </form>
            <p className="text-center ">Don't have an account? <span className="text-violet font-semibold text-violet-500 border-b-2 hover:text-violet-600 border-b-violet-500"><Link to={'/signup'}>Sign up</Link></span></p>
        </>
    )
}