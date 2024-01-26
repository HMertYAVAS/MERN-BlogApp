import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { HiMail, HiUser, HiLockClosed, HiPencil } from "react-icons/hi";

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [usernameDis,setUsernameDis] = useState(true)
  const [emailDis,setEmailDis] = useState(true)
  const [passwordDis,setPasswordDis] = useState(true)
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-5 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" action="">
        <div className="w-32 h-32 self-center overflow-hidden rounded-full">
          <img
            src={
              currentUser.profilePicture
                ? currentUser.profilePicture
                : "https://images.pexels.com/photos/9496595/pexels-photo-9496595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="photo"
            className="rounded-full w-full h-full border-4 object-cover border-[lightgray]"
          ></img>
        </div>
        <div className="grid grid-cols-10">
          <TextInput
            type="text"
            placeholder="Username"
            id="username"
            icon={HiUser}
            defaultValue={currentUser.username}
            className="col-span-9"
            disabled={usernameDis}
          />
          <Button className="col-span-1 ml-1" onClick={()=>setUsernameDis(!usernameDis)}>
            <HiPencil />
          </Button>
        </div>
        <div className="grid grid-cols-10">
          <TextInput
            type="text"
            placeholder="E-mail"
            id="email"
            icon={HiMail}
            defaultValue={currentUser.email}
            className="col-span-9"
            disabled={emailDis}

          />
          <Button className="col-span-1 ml-1" onClick={()=>setEmailDis(!emailDis)}>
            <HiPencil />
          </Button>

            
          </div>
          <div className="grid grid-cols-10">

          <TextInput
            type="text"
            placeholder="Password"
            id="password"
            icon={HiLockClosed}
            className="col-span-9"
            disabled={passwordDis}

          />
          <Button className="col-span-1 ml-1" onClick={()=>setPasswordDis(!passwordDis)}>
            <HiPencil />
          </Button>
        </div>

        <Button gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
        <div className="flex justify-between text-red-500">
          <span>Delete User</span>
          <span>Log out</span>
        </div>
      </form>
    </div>
  );
}
