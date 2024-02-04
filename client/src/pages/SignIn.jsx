import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIp() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  /*   console.log(formData); */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20 p-3">
      <div className="flex max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-28">
        {/* Left Side */}
        <div className="flex-1">
          <Link
            to={"/"}
            className="text-3xl sm:text-5xl font-bold dark:text-white mx-auto"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300 rounded-lg text-white">
              MERN
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            lorem ipsum sit amed lorem ipsum sit amed lorem ipsum sit amed
          </p>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          {" "}
          {/* Added mx-auto to center the content horizontally */}
          <form
            className="flex flex-col md:max-w-full max-w-screen-2xl gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label>Username:</label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <TextInput
                type="password"
                placeholder="*****"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone={"purpleToBlue"}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div>
              <span className="mr-3">Dont you have a account?</span>
              <Link
                to={"/sign-up"}
                className="text-blue-600 font-semibold text-sm"
              >
                Sign Up
              </Link>
              {errorMessage && (
                <Alert className="mt-5" color={"failure"}>
                  {errorMessage}
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
