import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";

const RenderLinks = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return (
      <div className="cursor-pointer">
        <Button
          label="Logout"
          handleClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        />
      </div>
    );
  } else {
    return (
      <>
        <div className="cursor-pointer">
          <Link className="text-black" to={"/signin"}>
            Sign in
          </Link>
        </div>
        <div className="cursor-pointer">
          <Link className="text-black" to={"/signin"}>
            Sign up
          </Link>
        </div>
      </>
    );
  }
};

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <nav className="fixed w-full top-0 px-20 py-3 h-24 flex bg-white border-b-2 border-black">
      <div className="flex justify-between m-auto w-full">
        <div className="logo text-3xl font-bold font-mono">MyBlogs</div>
        <div className="flex space-x-7 justify-center items-center">
          <div className="cursor-pointer">
            <Link className="text-black" to={"/"}>
              Home
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link className="text-black" to={loggedIn ? "/write" : "/signin"}>
              Write
            </Link>
          </div>
          <RenderLinks />
        </div>
      </div>
    </nav>
  );
};
