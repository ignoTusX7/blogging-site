import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupSideBox } from "../components/signupSideBox";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../components/ui/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginAtom, userAtom } from "../store/user";
interface IFormInput {
  email: string;
  password: string;
}

export const Signin = () => {
  const navigate = useNavigate();
  document.title = 'Signin';
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  useEffect(() => {
    if (loginState || localStorage.getItem("token")) {
      setLoginState(true);
      return navigate("/");
    }
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>();

  const setUserState = useSetRecoilState(userAtom);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email: data.email,
        password: data.password,
      });
      setLoading(false);
      if (res.data.success === true) {
        const jwt = res.data.token;
        setUserState({
          name: res.data.name,
        });
        localStorage.setItem("token", jwt);

        localStorage.setItem("name", res.data.name);
        setLoginState(true);
        return navigate("/");
      }
    } catch (error) {
      setLoading(false);
      //@ts-expect-error not_know_type
      if (error.response.data.status === false) {
        //@ts-expect-error not_know_type
        return toast.error(error.response.data.message);
      }
      toast.error("Failed to create an account");
      console.error("Error: ", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <ToastContainer />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium leading-6 text-gray-900`}
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email Address is required",
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                    className={`ps-2 flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none`}
                  />
                  {errors.email && (
                    <p role="alert" className="text-red-500 font-semibold">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium leading-6 text-gray-900`}
                >
                  Password
                </label>
                <div className="mt-2">
                  <div className="ps-2 flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    <input
                      id="password"
                      type={showPass ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      aria-invalid={errors.password ? "true" : "false"}
                      className={`border-none outline-none w-[93%]`}
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <BiHide /> : <BiShow />}
                    </div>
                  </div>
                  {errors.password && (
                    <p role="alert" className="text-red-500 font-semibold">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Button
                  label={loading ? "Loading..." : "Signup"}
                  type="submit"
                />
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Doesn't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-gray-900 hover:text-gray-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <SignupSideBox />
      </div>
    </div>
  );
};
