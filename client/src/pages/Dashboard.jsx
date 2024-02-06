import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardProfile from "../components/dashboard/DashboardProfile";
import DashboardPosts from "../components/dashboard/DashboardPosts";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    tabFromUrl ? setTab(tabFromUrl) : null;
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Side Bar */}
      <div className="md:w-56">
        <DashboardSidebar />
      </div>

      {/* Profile */}
        {tab === "profile" && <DashboardProfile />}
      {/* Post */}
        {tab == "posts" && <DashboardPosts />}
    </div>
  );
}
