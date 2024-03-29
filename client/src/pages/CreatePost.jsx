import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [file, setFiles] = useState([]);
  const [imageLoadProgress, setImageLoadProgress] = useState(null);
  const [imageLoadError, setImageLoadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageLoadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageLoadProgress(null);
          setImageLoadError("Image upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageLoadError(null), setImageLoadProgress(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageLoadError("Image Upload Failed");
      setImageLoadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="general">General</option>
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-orange-400 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300"
            size={"sm"}
            onClick={handleUploadImage}
            outline
          >
            {imageLoadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageLoadProgress}
                  text={`${imageLoadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageLoadError && <Alert color={"failure"}>{imageLoadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-96 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300 hover:bg-gradient-to-l"
        >
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color={"failure"}>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
