import { useEffect, useState } from "react";
import { getDashboard, logoutUser, getCsrfToken } from "../api/api";

import HeroSec from '../components/heroSec';
import Introduction from '../components/Introduction'
import Learning from '../components/Learning'
import OWASP from '../components/OWASP';
import ProjectOverview from '../components/ProjectOverview'
import TechStack from '../components/TechStack'
import Features from '../components/Features';


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
    <>
      <HeroSec/>

      <Introduction />
      <ProjectOverview />
      <Features />
      <TechStack />
      <OWASP />
      <Learning />

      {/* Footer Logout */}
      <div className="flex justify-center py-10">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </>
  );

}
