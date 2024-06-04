import { useFormik } from "formik";
import Navigation from "../../Navigation";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function CompleteTripDetails() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      price: "",
      passenger_size: "",
    },
    validationSchema: Yup.object({
      price: Yup.number().required().min(0, "price cannot be less than 0"),
      passenger_size: Yup.number().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      navigate("/Trip-created");
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
