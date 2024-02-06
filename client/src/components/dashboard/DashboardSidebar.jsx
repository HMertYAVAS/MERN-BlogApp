import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { GoPerson, GoSignOut } from "react-icons/go";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashboardSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    tabFromUrl ? setTab(tabFromUrl) : null;
  }, [location.search]);

  const handleLogout = async () => {
    try {
      const res = await fetch('api/user/signout',{
        method:'POST',
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error)
    }
  };

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
            <Sidebar.Item href="#" icon={GoSignOut} labelColor={"dark"} onClick={handleLogout} >
              Log Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
