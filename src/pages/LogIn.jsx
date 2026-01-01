import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        if(!email || !password){
          setLoading(false);
          return toast.error("Please fill all the fields");
        }
        try {
          const res= await API.post("/auth/login", {email, password})

          login(res.data.user);           

          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");

        } catch (error) {
          console.log(error)
          toast.error(error.response?.data?.error || "Something went wrong");
        }finally {
          setLoading(false);
        }
      }


    return(
        <>
            <form action="" onSubmit={handleSubmit} className="flex flex-col p-4 items-center justify-center gap-4">
                <h1 className="font-semibold mb-4 text-xl" >Log in</h1>
                
                <input
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                type="eamil"
                className="w-full max-w-80 h-15 px-4 py-6 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-violet-500 focus:border-gray-500"/>
                <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                className="w-full max-w-80 h-15 px-4 py-6 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-violet-500 focus:border-gray-500"/>
                
                <SubmitButton loading={loading}>
                  {loading ? "Logging in" : "Log In"}
                </SubmitButton>                

                <Link to={'/forgot-password'} className="text-sm text-gray-600 hover:text-gray-800 text-center ">Forgot password?</Link>
            </form>
            <p className="text-center ">Don't have an account? <span className="text-violet font-semibold text-violet-500 border-b-2 hover:text-violet-600 border-b-violet-500"><Link to={'/signup'}>Sign up</Link></span></p>
        </>
    )
}