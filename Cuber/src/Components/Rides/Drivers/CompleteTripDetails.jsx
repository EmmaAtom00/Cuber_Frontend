import { useFormik } from "formik";
import Navigation from "../../Navigation";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import axios from "axios";

function CompleteTripDetails() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const formik = useFormik({
    initialValues: {
      price: "",
      passenger_size: "",
    },
    validationSchema: Yup.object({
      price: Yup.number().required().min(0, "price cannot be less than 0"),
      passenger_size: Yup.number()
        .required()
        .max(20, "passengers cannot exceed 20"),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      await axios
        .post(`${url}/user/createRide`, values, config)
        .then((res) => {
          // console.log(res);
          navigate("/Trip-created");
        })
        .catch(async (err) => {
          // console.log(err.response.data);
          await toast.error(err.response.data.msg, {
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
          if (err.response.status == 300)
            return setTimeout(
              () => navigate("/Complete-driver-trip-details"),
              "2000"
            );
        });
      // /user/completeDriverDetails
      // ;
    },
  });
  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Please complete your trip details"} />

      <div className="">
        <form
          action=""
          className="flex flex-col gap-6 mt-12"
          onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="price">Price</label>
            <div className="flex">
              <input
                className="border-b-2 border-bl focus:outline-none py-1 w-[75%]"
                type="number"
                placeholder="100"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="-ml-12">naira</p>
            </div>
            {formik.errors.price && formik.touched.price ? (
              <small className="text-red-500 text-sm">
                {formik.errors.price}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="passenger_size">Passenger size</label>
            <div className="flex">
              <input
                className="border-b-2 border-bl focus:outline-none py-1 w-[75%]"
                type="number"
                placeholder="4"
                name="passenger_size"
                value={formik.values.passenger_size}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="-ml-12">naira</p>
            </div>
            {formik.errors.passenger_size && formik.touched.passenger_size ? (
              <small className="text-red-500 text-sm">
                {formik.errors.passenger_size}
              </small>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="bg-gr py-3 px-6 text-white rounded-md w-[75%] mx-auto mt-14">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default CompleteTripDetails;
