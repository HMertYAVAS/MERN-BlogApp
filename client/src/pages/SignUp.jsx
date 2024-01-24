import { TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
    <div className="flex-1"> {/* Added mx-auto to center the content horizontally */}
      <form className="flex flex-col md:max-w-full max-w-screen-2xl gap-4">
        <div>
          <label>Username:</label>
          <TextInput
            type="text"
            placeholder="Username"
            id="username"
          />
        </div>
        <div>
          <label>E-mail:</label>
          <TextInput
            type="text"
            placeholder="test@mail.com"
            id="email"
          />
        </div>
        <div>
          <label>Password:</label>
          <TextInput
            type="password"
            placeholder="*****"
            id="password"
          />
        </div>
      </form>
    </div>
  </div>
</div>

  );
}
