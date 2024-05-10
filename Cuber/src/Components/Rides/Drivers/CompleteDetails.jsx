import { useFormik } from "formik";
import Navigation from "../../Navigation";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function CompleteDetails() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      nin: "",
      type: "",
      reg_no: "",
    },
    validationSchema: Yup.object({
      nin: Yup.number("nin must be a number type").required(
        "NIN is a required field"
      ),
      type: Yup.string().required("Your vehicle type is a required field"),
      reg_no: Yup.string().required(
        "Vehicle registration number is a required field"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
      navigate("/pending-approval");
    },
  });
  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Please complete your driver details"} />
      <div className="flex flex-col gap-4">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="mt-12 flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="nin">NIN</label>
            <input
              className="border-b-2 w-[75%] py-1 mt-2 border-bl focus:outline-none"
              type="number"
              id="nin"
              name="nin"
              placeholder="70008848348"
              value={formik.values.nin}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.nin && formik.touched.nin ? (
              <small className="text-red-500 text-sm">
                {formik.errors.nin}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="type">Vehicle type</label>
            <input
              className="border-b-2 w-[75%] py-1 mt-2 border-bl focus:outline-none"
              type="text"
              id="type"
              name="type"
              placeholder="Bus"
              value={formik.values.type}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.type && formik.touched.type ? (
              <small className="text-red-500 text-sm">
                {formik.errors.type}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="reg_no">Reg No</label>
            <input
              className="border-b-2 w-[75%] py-1 mt-2 border-bl focus:outline-none"
              type="text"
              id="reg_no"
              name="reg_no"
              placeholder="70008848348"
              value={formik.values.reg_no}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.reg_no && formik.touched.reg_no ? (
              <small className="text-red-500 text-sm">
                {formik.errors.reg_no}
              </small>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="bg-gr py-4 px-8 text-white rounded-md w-[75%] mx-auto mt-20">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteDetails;
