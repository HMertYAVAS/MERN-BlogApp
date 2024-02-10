import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { GoPerson, GoSignOut, GoBook, GoPeople, GoComment,GoBrowser } from "react-icons/go";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function DashboardSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    tabFromUrl ? setTab(tabFromUrl) : null;
  }, [location.search]);

  const handleLogout = async () => {
    try {
      const res = await fetch("api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Sidebar className="w-full md:w-56  md:h-screen">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to={"/dashboard?tab=profile"}>
              <Sidebar.Item
                active={tab === "profile"}
                icon={GoPerson}
                label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor={"dark"}
                as={"div"}
              >
                Profile
              </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=dashboard"}>
                <Sidebar.Item
                  active={tab === "dashboard"}
                  icon={GoBrowser}
                  labelColor={"dark"}
                  as={"div"}
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
            )}
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=users"}>
                <Sidebar.Item
                  active={tab === "users"}
                  icon={GoPeople}
                  labelColor={"dark"}
                  as={"div"}
                >
                  Users
                </Sidebar.Item>
              </Link>
            )}
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=posts"}>
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={GoBook}
                  labelColor={"dark"}
                  as={"div"}
                >
                  Posts
                </Sidebar.Item>
              </Link>
            )}
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=comments"}>
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={GoComment}
                  labelColor={"dark"}
                  as={"div"}
                >
                  Comments
                </Sidebar.Item>
              </Link>
            )}
            
            <Sidebar.Item
              href="#"
              icon={GoSignOut}
              labelColor={"dark"}
              onClick={handleLogout}
            >
              Log Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
