import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { GoPerson, GoSignOut } from "react-icons/go";

export default function DashboardSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    tabFromUrl ? setTab(tabFromUrl) : null;
  }, [location.search]);
  return (
    <div>
      <Sidebar className="w-full md:w-56  md:h-screen">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to={'/dashboard?tab=profile'}>
              <Sidebar.Item
                active={tab === "profile"}
                icon={GoPerson}
                label={"User"}
                labelColor={"dark"}
                as ={'div'}
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={GoSignOut} labelColor={"dark"}>
              Log Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
