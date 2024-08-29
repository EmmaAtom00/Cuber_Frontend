import { useFormik } from "formik";
import cuberLogo from "/logo.svg";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import axios, { AxiosError } from "axios";
import { Bounce, Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [signupLoading, setSignupLogin] = useState(false);
  const url = import.meta.env.VITE_URL;
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6, "Minimum character is 6"),
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const request = await axios
        .post(`${url}/auth/signup`, {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        })
        .then(async (res) => {
          await toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          localStorage.setItem("token", res.data.token);
          setTimeout(() => setNav(true), "4000");
        })
        .catch(async (err) => {
          err.message ? toast.error(err.message) : "";
          await toast.error(err.response.data.msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          setSignupLogin(false);
        })
        .finally(setSignupLogin(true));
    },
  });

  const [password, setPassword] = useState("password");
  const pss = () => {
    if (password == "password") {
      setPassword("text");
    } else {
      setPassword("password");
    }
  };
  if (nav) return <Navigate to={"/dashboard"} />;
  return (
    <div className="p-[2em]">
      <ToastContainer />
      <div className="flex flex-col  items-center justify-center">
        <Link to={"/"}>
          <img src={cuberLogo} alt="Cuber logo" />
        </Link>
      </div>
      <div className="mt-16">
        <h1 className="text-4xl text-bl mb-16">Sign up</h1>
        <form action="" onSubmit={form.handleSubmit} className="grid gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-gre text-sm">
              Email address
            </label>
            <div className="flex items-center">
              <input
                className="text-bl py-1 placeholder-bl border-b-2 border-b-bl focus:outline-none w-[75%]"
                id="email"
                type="text"
                value={form.values.email}
                onChange={form.handleChange}
                name="email"
                placeholder="Example@gmail.com"
                onBlur={form.handleBlur}
              />
              {!form.errors.email && form.touched.email ? (
                <div className="-ml-6">
                  <IoMdCheckmark color="#28374B" />
                </div>
              ) : (
                ""
              )}
            </div>

            {form.errors.email && form.touched.email ? (
              <p className="text-red-500 text-sm">{form.errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="firstName" className="text-gre text-sm">
              Firstname
            </label>
            <div className="flex items-center">
              <input
                className="text-bl py-1 placeholder-bl border-b-2 border-b-bl focus:outline-none w-[75%]"
                id="firstName"
                type="text"
                value={form.values.firstName}
                onChange={form.handleChange}
                name="firstName"
                placeholder="Abraham"
                onBlur={form.handleBlur}
              />
              {!form.errors.firstName && form.touched.firstName ? (
                <div className="-ml-6">
                  <IoMdCheckmark color="#28374B" />
                </div>
              ) : (
                ""
              )}
            </div>

            {form.errors.firstName && form.touched.firstName ? (
              <p className="text-red-500 text-sm">{form.errors.firstName}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="lastName" className="text-gre text-sm">
              lastName
            </label>
            <div className="flex items-center">
              <input
                className="text-bl py-1 placeholder-bl border-b-2 border-b-bl focus:outline-none w-[75%]"
                id="lastName"
                type="text"
                value={form.values.lastName}
                onChange={form.handleChange}
                name="lastName"
                placeholder="Joshua"
                onBlur={form.handleBlur}
              />
              {!form.errors.lastName && form.touched.lastName ? (
                <div className="-ml-6">
                  <IoMdCheckmark color="#28374B" />
                </div>
              ) : (
                ""
              )}
            </div>

            {form.errors.lastName && form.touched.lastName ? (
              <p className="text-red-500 text-sm">{form.errors.lastName}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gre text-sm">
              Password
            </label>
            <div className="flex items-center">
              <input
                className="text-bl py-1 placeholder-bl border-b-2 border-b-bl focus:outline-none w-[75%]"
                type={password}
                name="password"
                placeholder=""
                onChange={form.handleChange}
                value={form.values.password}
                onBlur={form.handleBlur}
              />
              <div onClick={pss} className="-ml-6">
                {password == "password" ? (
                  <FaRegEye color="#28374B" />
                ) : (
                  <FaRegEyeSlash color="#28374B" />
                )}
              </div>
            </div>

            {form.errors.password && form.touched.password ? (
              <p className="text-red-500 text-sm">{form.errors.password}</p>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <button
              type="submit"
              className="bg-gr py-4 rounded-md flex items-center justify-center gap-2 text-white w-2/3">
              <p>Sign up</p>
              {signupLoading ? (
                <div className="animate-spin">
                  <FaSpinner />
                </div>
              ) : (
                ""
              )}
            </button>
            <small className="text-red-500 mt-2">
              Already have an account? <Link to={"/Login"}>Login here</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
