import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function SelectLocation() {
  const [location, SelectLocation] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      pickup: "",
      destination: "",
    },
    validationSchema: Yup.object({
      pickup: Yup.string().required(),
      destination: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      navigate("/Choose-a-ride");
    },
  });

  return (
    <div className="">
      <div className="p-[2em]">
        <div className="flex items-center justify-center relative">
          <Link to={"/dashboard"} className="absolute left-0 top-0">
            <IoIosArrowRoundBack size={30} />
          </Link>
        </div>
      </div>
      <div className="absolute p-[2em] rounded-md bottom-0 w-full flex flex-col gap-8 pb-16">
        <div className="flex items-center gap-20">
          <div className="flex gap-4 items-center">
            <div className="bg-bl p-2 rounded-full w-fit">
              <MdMyLocation color="white" size={25} />
            </div>
            <div className="flex flex-col">
              <p>Pick up location</p>
              <input
                type="text"
                name="pickup"
                id="pickup"
                value={formik.values.pickup}
                onChange={formik.handleChange}
                placeholder="Obantoko"
                className="border-b-2 border-bl w-60 focus:outline-none py-1"
              />
              {formik.errors.pickup && formik.touched.pickup ? (
                <small className="text-red-500 text-sm">
                  {formik.errors.pickup}
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
          <label htmlFor="pickup">
            <IoPencil />
          </label>
        </div>

        <div className="flex items-center gap-20">
          <div className="flex gap-4 items-center">
            <div className="bg-bl p-2 rounded-full w-fit">
              <CiLocationOn color="white" size={25} />
            </div>
            <div className="flex flex-col">
              <p>Pick up location</p>
              <input
                type="text"
                name="destination"
                id="destination"
                value={formik.values.destination}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Camp"
                className="border-b-2 border-bl w-60 focus:outline-none py-1"
              />
              {formik.errors.destination && formik.touched.destination ? (
                <small className="text-red-500 text-sm">
                  {formik.errors.destination}
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
          <label htmlFor="destination">
            <IoPencil />
          </label>
        </div>
        <button
          type="submit"
          onClick={formik.handleSubmit}
          className="bg-gr text-white py-3 rounded-md mt-8 w-[60%] mx-auto">
          Find a ride
        </button>
      </div>
    </div>
  );
}
export default SelectLocation;
