import { useRecoilState } from "recoil";
import { UserBlog } from "../components/UserBlog";
import { loginAtom } from "../store/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/Button";

export const Profile = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginAtom);

  
  useEffect(()=>{
    if (!loginState) {
      return navigate("/signin");
    }
  },[loginState])

  return (
    <div className="">
      <div className="pt-20 px-8 grid grid-col-1 md:grid-cols-3 mx-auto">
        <div className="md:col-span-2 border-r-[1px] border-gray-200 h-screen overflow-x-auto">
          <h4 className="text-4xl font-semibold">{localStorage.getItem('name')}</h4>
          <div className="mt-4">
            <h5 className="font-semibold text-lg">Your Posts: </h5>
            <UserBlog />
          </div>
        </div>
        <div className=" pl-10">
          <div>
            <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-22 h-22 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xl"> {localStorage.getItem('name')}</p>
          </div>
          <div className="mt-3 flex w-1/3">
            <Button label="Logout" handleClick={()=>{
                        localStorage.removeItem("token");
                        localStorage.removeItem("name");
                        setLoginState(false);
                        window.location.href = "/signin";
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
};
