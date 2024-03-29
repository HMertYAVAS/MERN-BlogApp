import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import {
  HiMail,
  HiUser,
  HiLockClosed,
  HiPencil,
  HiOutlineExclamation,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutSuccess,
} from "../../redux/user/userSlice";
import { set } from "mongoose";
import { Link } from "react-router-dom";

export default function DashboardProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [usernameDis, setUsernameDis] = useState(true);
  const [emailDis, setEmailDis] = useState(true);
  const [passwordDis, setPasswordDis] = useState(true);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setimageFileUploading] = useState(false);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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

  useEffect(()=>{
    setFormData({...formData,username:currentUser.username,email:currentUser.email})
  },[currentUser])

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
    setimageFileUploading(true);
    setImageFileUploadError(null);
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
        setimageFileUploading(false);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageFileUploading(false);
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-5 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" action="" onSubmit={handleSubmit}>
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
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                    })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="photo"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
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
            onChange={handleChange}
          />
          <Button
            className="col-span-1 ml-1 bg-teal-300"
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
            onChange={handleChange}
          />
          <Button
            className="col-span-1 ml-1 bg-teal-300"
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
            onChange={handleChange}
          />
          <Button
            className="col-span-1 ml-1 bg-teal-300"
            onClick={() => setPasswordDis(!passwordDis)}
          >
            <HiPencil />
          </Button>
        </div>

        <Button gradientDuoTone="purpleToBlue" outline type="submit" disabled={loading || imageFileUploading}>
          {loading ? 'Loading' : 'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="tealToLime"
              className={"w-full"}
            >
              Create Post
            </Button>
          </Link>
        )}
        <div className="flex justify-between text-red-500">
          <span onClick={() => setShowModal(true)} className="cursor-pointer">
            Delete User
          </span>
          <span onClick={handleLogout} className="cursor-pointer">
            Log out
          </span>
        </div>
        {updateUserSuccess && (
          <Alert color={"success"} className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color={"failure"} className="mt-5">
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert color={"failure"} className="mt-5">
            {error}
          </Alert>
        )}
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {" "}
              Do you want delete your account?
            </h3>
            <div className="flex justify-center gap-5">
              <Button className="" color="failure" onClick={handleDeleteUser}>
                Delete
              </Button>
              <Button
                className=""
                color="gray"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
