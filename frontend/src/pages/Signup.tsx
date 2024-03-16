import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupSideBox } from "../components/signupSideBox";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface IFormInput {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

export const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>();

  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setLoading(false);
      if (res.status == 200) {
        return navigate("/signin");
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
    <div className="grid grid-cols-2">
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
          <ToastContainer />
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create an Account
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
                  htmlFor="name"
                  className={`block text-sm font-medium leading-6 text-gray-900`}
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      maxLength: 64,
                    })}
                    aria-invalid={errors.name ? "true" : "false"}
                    className={`ps-2 flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none`}
                  />
                  {errors.name && (
                    <p role="alert" className="text-red-500 font-semibold">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
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
                <label
                  htmlFor="cpassword"
                  className={`block text-sm font-medium leading-6 text-gray-900`}
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <div className="ps-2 flex items-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    <input
                      id="cpassword"
                      type={showCPass ? "text" : "password"}
                      {...register("cpassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === password.current ||
                          "Password and Confirm Password do not match",
                      })}
                      className={`border-none outline-none w-[93%]`}
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowCPass(!showCPass)}
                    >
                      {showCPass ? <BiHide /> : <BiShow />}
                    </div>
                  </div>

                  {errors.cpassword && (
                    <p role="alert" className="text-red-500 font-semibold">
                      {errors.cpassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "Loading..." : "Signup"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                signin
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div>
        <SignupSideBox />
      </div>
    </div>
  );
};
