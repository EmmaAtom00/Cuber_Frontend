import { useFormik } from "formik";
import cuberLogo from "/logo.svg";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

function Login() {
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6, "Minimum character is 6"),
    }),
    onSubmit: async (values) => {
      await console.log(values);
      navigate("/Dashboard");
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
  return (
    <div className="p-[2em]">
      <div className="flex flex-col  items-center justify-center">
        <Link to={"/"}>
          <img src={cuberLogo} alt="Cuber logo" />
        </Link>
      </div>
      <div className="mt-20">
        <h1 className="text-4xl text-bl mb-16">Login</h1>
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
                onBlur={form.handleBlur}
                name="email"
                placeholder="Example@gmail.com"
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
                onBlur={form.handleBlur}
                value={form.values.password}
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
          <small className="text-red-500">
            <Link>Forgot password?</Link>
          </small>
          <div className="flex flex-col items-center justify-center mt-10">
            <button
              type="submit"
              className="bg-gr py-4 rounded-md text-white w-2/3 flex items-center justify-between px-8">
              Login
              <IoIosArrowRoundForward size={30} />
            </button>
            <small className="text-red-500 mt-2">
              Don't have an account? <Link to={"/Signup"}>Sign up here</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
