import { useContext, useState,  } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate("/");
    }
    
    return(
        <>
        <nav className="flex justify-between items-center px-4 py-2 align-center shadow-md">
            <h1 className="font-bold text-2xl">A<span className="text-violet-700">u</span>th</h1>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden cursor-pointer  py-2 px-4 font-bold rounded-sm hover:bg-gray-300 duration-300 ease-in-out "
            >
              {isOpen ?  'X' : "☰" }
            </button>
            <div className="hidden md:flex md:items-center gap-2">
                <div>
                    <Link to="/" className="hover:bg-gray-200 hover:text-violet-600 text-gray-600 py-3 px-4 rounded-sm">Home</Link>
                    <Link to="/dashboard" className="hover:bg-gray-200 hover:text-violet-600 text-gray-600 py-3 px-4 rounded-sm ">Dashboard</Link>
                </div>
                {!user ? (
                 <div className="flex gap-2">
                    <Link to="/signup" className=" py-2 px-4 font-bold bg-violet-800 text-white rounded-sm hover:bg-violet-600 duration-300 ease-in-out">Sign Up</Link>
                    <Link to="/login" className="border border-violet-500 py-2 px-4 font-bold rounded-sm hover:bg-gray-300 duration-300 ease-in-out">log in</Link>
                </div>   
                ):(
                    <button onClick={handleLogout} className="border border-violet-500 py-2 px-4 font-bold rounded-sm hover:bg-gray-300 duration-300 ease-in-out">log out</button>

                )}
                
            </div>
            
        </nav>
        {isOpen && (
            <div className="md:hidden  flex   fixed inset-0 z-50 right-0  ">
                <div className="w-[55%] bg-black/10 backdrop-blur-sm relative">
                    <button onClick={()=> setIsOpen(!isOpen)} className="rounded-full absolute right-4 top-4 bg-white hover:bg-gray-100 p-2 text-center w-10 h-10 cursor-pointer  ">X</button>
                </div>
                
                <ul className=" space-x-6 right-0 w-[45%] pt-2 flex flex-col  bg-white shadow-md">
                  {!user ? (
                    <>
                        <Link to="/login" onClick={()=> setIsOpen(!isOpen)} className="text-violet-600 rounded-r-md hover:bg-gray-100 m-0 px-4 py-2">Login</Link>
                        <Link to="/signup" onClick={()=> setIsOpen(!isOpen)} className="text-violet-600 rounded-r-md hover:bg-gray-100 m-0 px-4 py-2">Sign Up</Link>

                    </>
                  ): (
                    <button onClick={()=> {handleLogout(); setIsOpen(!isOpen)} } className="text-violet-600 rounded-r-md hover:bg-gray-100 m-0 px-4 py-2">Log out</button>
                  )}
                  <Link to="/dashboard" onClick={()=> setIsOpen(!isOpen)} className="text-violet-600 rounded-r-md hover:bg-gray-100 m-0 px-4 py-2">Dashboard</Link>
                  <hr className="border-gray-300 my-4" />
                </ul>

            </div>
        )}
        
        </>
    )
}