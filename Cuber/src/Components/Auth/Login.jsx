import { useFormik } from "formik";
import cuberLogo from "/logo.svg";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Spinner.css";

function Login() {
  const [nav, setNav] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const checkForLoggedIn = async () => {
      axios
        .get(`${url}/protects`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          // toast.success("You're logged in");
          console.log(res);
          setAuth(true);
        })
        .catch((err) => console.log(err))
        .finally(setLoading(false));
    };
    checkForLoggedIn();
  }, [url]);

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
      await axios
        .post(`${url}/auth/login`, {
          email: values.email,
          password: values.password,
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
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          setTimeout(() => setNav(true), "2000");
        })
        .catch(async (err) => {
          // console.log(err);
          err.message && !err.response ? toast.error("failed to fetch") : "";
          err.response.data.msg ? toast.error(err.response.data.msg) : "";
        });
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
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (auth && localStorage.getItem("token"))
    return <Navigate to={"/dashboard"} />;
  if (nav) return <Navigate to={"/dashboard"} />;
  return (
    <div className="p-[2em]">
      <ToastContainer />
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
