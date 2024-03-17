import { useState } from "react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginAtom } from "../store/user";

const RenderMenu = () => {
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  if (loginState) {
    return (
      <Button
        handleClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          setLoginState(false);
          window.location.href = "/signin";
        }}
        label="Logout"
      />
    );
  } else {
    return (
      <>
        <Link
          to="/signin"
          className="text-black hover:text-gray-700 px-3 py-2 block rounded-md text-sm font-medium"
        >
          Signin
        </Link>
        <Link
          to="/signup"
          className="text-black hover:text-gray-700 px-3 py-2 block rounded-md text-sm font-medium"
        >
          Signup
        </Link>
      </>
    );
  }
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loginState = useRecoilValue(loginAtom);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="static md:fixed top-0 w-screen bg-white border-b-[1px] border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-black">
              <Link to={"/"}>
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.32 9.798c.078-.176.142-.375.142-.593V6a1 1 0 0 0-1-1h-2V3a1 1 0 1 0-2 0v2H8V3a1 1 0 1 0-2 0v2H4a1 1 0 0 0-1 1v2.205c0 .218.064.417.142.593A5.981 5.981 0 0 0 6 15.83V17a1 1 0 0 0 1 1h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 0 0 1-1v-1.17a5.981 5.981 0 0 0 5.32-5.032zM8 5h4v2H8V5zM4 5h2v2H4V5zm0 4h4v2H4V9zm12 6h-2v-2h2v2zm0-4h-2V9h2v2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to={`${loginState ? "/write" : "/signin"}`}
                  className="text-black hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Write
                </Link>
                <RenderMenu />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/* Heroicon name: menu */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open. */}
              {/* Heroicon name: x */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle className based on menu state. */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to={`${loginState ? "/write" : "/signin"}`}
            className="text-black hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Write
          </Link>
          <RenderMenu />
        </div>
      </div>
    </nav>
  );
};
