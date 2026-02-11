import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser, getCsrfToken } from "../api/api";

export default function Login() {
  const [csrfToken, setCsrfToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getCsrfToken().then((res) => setCsrfToken(res.data.csrfToken));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }, csrfToken);
      alert(res.data.message);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form className="bg-slate-900 shadow-md p-6 rounded w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-center text-green-100">Login</h2>

        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button type="submit" >Login</Button>

        <p className="mt-3 text-center text-green-500">
          New user? <a href="/register" className="hover:text-green-100 ">Register</a>
        </p>
      </form>
    </div>
  );
}