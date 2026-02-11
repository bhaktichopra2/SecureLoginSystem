import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerUser, getCsrfToken } from "../api/api";

export default function Register(){
    const [csrfToken, setCsrfToken] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
//fetch csrf token on mount
useEffect(()=>{
    getCsrfToken().then((res)=>setCsrfToken(res.data.csrfToken));
}, []);

const handleRegister = async (e) =>{
    e.preventDefault();
    try{
        const res = await registerUser({email, password}, csrfToken);
        alert(res.data.message);
        window.location.href = "/"; // go to login
    }catch(err){
        alert(err.response?.data?.message || "Registration failed");
    }
}

return(

    <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <form className="bg-slate-900 shadow-md p-6 rounded w-96" onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold mb-4 text-center text-emerald-100">Register</h2>

            <Input label="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> 

            <Button type="submit">Register</Button>

            <p className="mt-3 text-center text-green-500">
            Already have an account? <a href="/" className="text-green-500 hover:text-green-100">Login</a>
            </p>
        </form>
    </div>
)
}
