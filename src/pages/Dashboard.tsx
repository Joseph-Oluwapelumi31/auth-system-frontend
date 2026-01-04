import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Dashboard() {
    const { user } = useContext(AuthContext)
        
    if (!user) {
        return <h1>Loading...</h1>;
    }
    return (
        <div>
          <h1>Welcome to your Dashboard, {user.username}!</h1>
          <p>Your email: {user.email}</p>
        </div>
    );
    
 
}