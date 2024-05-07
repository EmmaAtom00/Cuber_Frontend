import { useFormik } from "formik";
import cuberLogo from "/logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

function SignUp() {
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6, "Minimum character is 6"),
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      await console.log(values);
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
            <label htmlFor="firstname" className="text-gre text-sm">
              Firstname
            </label>
            <div className="flex items-center">
              <input
                className="text-bl py-1 placeholder-bl border-b-2 border-b-bl focus:outline-none w-[75%]"
                id="firstname"
                type="text"
                value={form.values.firstname}
                onChange={form.handleChange}
                name="firstname"
                placeholder="Abraham"
                onBlur={form.handleBlur}
              />
              {!form.errors.firstname && form.touched.firstname ? (
                <div className="-ml-6">
                  <IoMdCheckmark color="#28374B" />
                </div>
              ) : (
                ""
              )}
            </div>

            {form.errors.firstname && form.touched.firstname ? (
              <p className="text-red-500 text-sm">{form.errors.firstname}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="lastname" className="text-gre text-sm">
              Lastname
            </label>
            <div className="flex items-center">
              <input
                className="text-bl py-1 placeholder-bl border-b-2 border-b-bl focus:outline-none w-[75%]"
                id="lastname"
                type="text"
                value={form.values.lastname}
                onChange={form.handleChange}
                name="lastname"
                placeholder="Joshua"
                onBlur={form.handleBlur}
              />
              {!form.errors.lastname && form.touched.lastname ? (
                <div className="-ml-6">
                  <IoMdCheckmark color="#28374B" />
                </div>
              ) : (
                ""
              )}
            </div>

            {form.errors.lastname && form.touched.lastname ? (
              <p className="text-red-500 text-sm">{form.errors.lastname}</p>
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
              className="bg-gr py-4 rounded-md text-white w-2/3">
              Sign up
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
