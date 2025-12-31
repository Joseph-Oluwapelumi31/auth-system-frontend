import { useState, useContext } from "react"
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, SetuserName] = useState("");
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSublit = async(e) =>{
        e.preventDefault();
        if(!email || !password || !username){
            return toast.error("Please fill all the fields");
        }

        // Signup logic to be implemented
        try {
            const res = await API.post("/auth/signup", {username, email, password})
            
            login(res.data.user);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
            toast.success("Signup successful");
        } catch (error) {
            console.log(error)

            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return(
        <>
            <form action="" onSubmit={handleSublit} className="flex flex-col p-4 items-center justify-center gap-4">
                <h1 className="font-semibold mb-4 text-xl" >Sign up with email</h1>
                <input 
                type="text"
                placeholder="userName"
                value={username}
                onChange={(e) => SetuserName(e.target.value)}   
                className="w-full max-w-80 h-15 px-4 py-6 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-violet-500 focus:border-gray-500"/>
                    
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
                
                <button className="w-full max-w-80 h-15 text-center bg-violet-600 cursor-pointer hover:bg-violet-500 text-white font-semibold rounded-sm">Continue</button>
            </form>
            <p className="text-center ">Already have an account? <span className="text-violet font-semibold text-violet-500 border-b-2 hover:text-violet-600 border-b-violet-500"><Link to={'/login'}>Log in</Link></span></p>
        </>
    )
}