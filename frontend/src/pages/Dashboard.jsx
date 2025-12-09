import { useEffect, useState } from "react";
import { getDashboard, logoutUser, getCsrfToken } from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data.message))
      .catch(() => (window.location.href = "/"));
  }, []);

const handleLogout = async () => {
  try {
    // Get new CSRF token before logout
    const res = await getCsrfToken();
    const csrf = res.data.csrfToken;

    console.log("Fetched CSRF token:", csrf);

    // Now call logout with CSRF token
    const logoutRes = await logoutUser(csrf);

    console.log("Logout API Response:", logoutRes);

    alert("Logged out");
    window.location.href = "/";
  } catch (err) {
    console.error("Logout error:", err);
    alert("Logout failed");
  }
};


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{data}</h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
