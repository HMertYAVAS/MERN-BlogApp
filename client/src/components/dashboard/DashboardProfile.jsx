import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { HiMail, HiUser, HiLockClosed, HiPencil } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [usernameDis, setUsernameDis] = useState(true);
  const [emailDis, setEmailDis] = useState(true);
  const [passwordDis, setPasswordDis] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    /*     service firebase.storage {
        match /b/{bucket}/o {
          match /{allPaths=**} {
            allow read;
            allow write: if 
            request.resource.size < 2 * 1024 * 1024 &&
            request.resource.contentType.matches('image/.*')
          }
        } */
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less 2MB)"
        );
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  console.log(imageFileUploadError, imageFileUploadProgress);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-5 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" action="">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

        <div
          className="relative w-32 h-32 self-center overflow-hidden rounded-full cursor-pointer shadow-md"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={
              currentUser.profilePicture ||
              imageFileUrl ||
              "https://images.pexels.com/photos/9496595/pexels-photo-9496595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="photo"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                'opacity-60'
              }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"} className="text-center">
            {imageFileUploadError}
          </Alert>
        )}
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
          <Button
            className="col-span-1 ml-1"
            onClick={() => setUsernameDis(!usernameDis)}
          >
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
          <Button
            className="col-span-1 ml-1"
            onClick={() => setEmailDis(!emailDis)}
          >
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
          <Button
            className="col-span-1 ml-1"
            onClick={() => setPasswordDis(!passwordDis)}
          >
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
