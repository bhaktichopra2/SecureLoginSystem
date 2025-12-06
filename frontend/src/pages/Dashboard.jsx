import { useEffect, useState } from "react";
import { getDashboard, logoutUser } from "../api/api";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDashboard()
      .then((res) => setMessage(res.data.message))
      .catch(() => {
        window.location.href = "/"; // not logged in
      });
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">{message}</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
