import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function SignIp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
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
          <form className="flex flex-col md:max-w-full max-w-screen-2xl gap-4" onSubmit={handleSubmit}>
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
            <Button type="submit" gradientDuoTone={"purpleToBlue"} disabled={loading} >
              {
                loading ?
                (
                  <>
                  <Spinner size={'sm'} />
                  <span className="pl-3">Loading...</span>  
                  </>
                  ):"Submit"
              }
              
            </Button>
            <div>
              <span className="mr-3">Did you have a account?</span>
              <Link
                to={"/sign-in"}
                className="text-blue-600 font-semibold text-sm"
              >

                Sign Up
              </Link>
            {errorMessage && 
            <Alert className="mt-5" color={'failure'}>
              {errorMessage}
            </Alert>
            }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
