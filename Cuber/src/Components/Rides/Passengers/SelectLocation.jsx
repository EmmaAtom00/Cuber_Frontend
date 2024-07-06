import { useEffect, useState, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { Flip, ToastContainer, toast } from "react-toastify";

function SelectLocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [destination, setDestination] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);
  const [searchVisible, setSearchVisible] = useState(true);
  const mapRef = useRef();
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      const geocoder = new MapboxGeocoder({
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        mapboxgl: mapRef.current,
        marker: false,
        placeholder: "Search for locations",
        countries: "NG", // Limit search results to Nigeria
        bbox: [2.676932, 4.240594, 14.677018, 13.885645], // Nigeria bounding box
        // types: "address", // Restrict results to addresses (e.g., streets)
      });

      // const geocoder = new MapboxGeocoder({
      //   accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
      //   mapboxgl: mapRef.current,
      //   marker: false,
      //   placeholder: "Search for locations",
      // });

      map.addControl(geocoder);

      geocoder.on("result", (event) => {
        const { result } = event;
        if (formik.values.searchType === "pickup") {
          setLocation({
            latitude: result.geometry.coordinates[1],
            longitude: result.geometry.coordinates[0],
          });
        } else {
          setDestination({
            latitude: result.geometry.coordinates[1],
            longitude: result.geometry.coordinates[0],
          });
        }
      });

      return () => {
        map.removeControl(geocoder);
      };
    }
  }, []);

  const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const config = {
    headers: {
      "content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      pickup: "",
      destination: "",
      searchType: "pickup",
    },
    validationSchema: Yup.object({
      pickup: Yup.string().required(),
      destination: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const dataToSend = {
        ...values,
        currentLocation: location,
        destinationLocation: destination,
      };
      await axios
        .post(`${url}/user/selectLocation`, { dataToSend }, config)
        .then((res) => {
          console.log(res);
          navigate("/Choose-a-ride");
        })
        .catch(async (err) => {
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
        });
      // Send data to the server
      //
    },
  });

  return (
    <div className="relative">
      <ToastContainer />
      <div className="p-[2em]">
        <div className="flex items-center justify-center relative">
          <Link to={-1} className="absolute left-0 top-0">
            <IoIosArrowRoundBack size={30} />
          </Link>
          <button
            onClick={() => setSearchVisible(!searchVisible)}
            className="absolute right-0 top-0">
            Toggle Search
          </button>
        </div>
      </div>

      <Map
        ref={mapRef}
        mapboxAccessToken={mapBoxToken}
        initialViewState={{
          longitude: location.longitude || -122.4194,
          latitude: location.latitude || 37.7749,
          zoom: 12,
        }}
        style={{ width: "100%", height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11">
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />
        <FullscreenControl position="top-left" />
        <ScaleControl position="bottom-left" />

        {location.latitude && location.longitude && (
          <Marker
            latitude={location.latitude}
            longitude={location.longitude}
            color="red"
          />
        )}
        {destination.latitude && destination.longitude && (
          <Marker
            latitude={destination.latitude}
            longitude={destination.longitude}
            color="blue"
          />
        )}
      </Map>

      {searchVisible && (
        <div className="absolute p-[2em] rounded-md bottom-0 w-full flex flex-col gap-8 pb-16 bg-white shadow-lg">
          <div className="flex items-center gap-20">
            <div className="flex gap-4 items-center">
              <div className="bg-bl p-2 rounded-full w-fit">
                <MdMyLocation color="white" size={25} />
              </div>
              <div className="flex flex-col">
                <p className="">Pick up location</p>
                <input
                  type="text"
                  name="pickup"
                  id="pickup"
                  value={formik.values.pickup}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("searchType", "pickup");
                  }}
                  placeholder="Search for pickup location"
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
                <p className="">Destination</p>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  value={formik.values.destination}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("searchType", "destination");
                  }}
                  onBlur={formik.handleBlur}
                  placeholder="Search for destination"
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
      )}
    </div>
  );
}

export default SelectLocation;

// import { useEffect, useState } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { CiLocationOn } from "react-icons/ci";
// import { MdMyLocation } from "react-icons/md";
// import { IoPencil } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// function SelectLocation() {
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setError(null);
//         },
//         (error) => {
//           setError(error.message);
//         },
//         {
//           enableHighAccuracy: true, // Use GPS if available
//           timeout: 5000, // Timeout before error callback is invoked
//           maximumAge: 0, // Do not use cached location
//         }
//       );

//       // Cleanup function to stop watching the position when the component is unmounted
//       return () => {
//         navigator.geolocation.clearWatch(watchId);
//       };
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN;

//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       pickup: "",
//       destination: "",
//     },
//     validationSchema: Yup.object({
//       pickup: Yup.string().required(),
//       destination: Yup.string().required(),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//       navigate("/Choose-a-ride");
//     },
//   });

//   //   Google map integration

//   return (
//     <div className="">
//       <div className="p-[2em]">
//         <div className="flex items-center justify-center relative">
//           <Link to={-1} className="absolute left-0 top-0">
//             <IoIosArrowRoundBack size={30} />
//           </Link>
//         </div>
//       </div>
//       {/* Google map */}
//       {/* <GoogleMap
//         center={center}
//         zoom={15}
//         mapContainerStyle={{ width: "100%", height: "100%" }}>
//         <Marker position={center} />
//       </GoogleMap> */}

//       <Map
//         mapboxAccessToken={mapBoxToken}
//         initialViewState={{
//           longitude: location.longitude,
//           latitude: location.latitude,
//           zoom: 20,
//         }}
//         style={{ width: 600, height: 400 }}
//         mapStyle="mapbox://styles/mapbox/streets-v9">
//         <GeolocateControl />
//         <Marker
//           longitude={location.longitude}
//           latitude={location.latitude}
//           color="red"
//         />
//         <NavigationControl visualizePitch={true} />
//       </Map>

//       <div className="absolute p-[2em] rounded-md bottom-0 w-full flex flex-col gap-8 pb-16">
//         <div className="flex items-center gap-20">
//           <div className="flex gap-4 items-center">
//             <div className="bg-bl p-2 rounded-full w-fit">
//               <MdMyLocation color="white" size={25} />
//             </div>
//             <div className="flex flex-col">
//               <p className="">Pick up location</p>
//               <input
//                 type="text"
//                 name="pickup"
//                 id="pickup"
//                 value={formik.values.pickup}
//                 onChange={formik.handleChange}
//                 placeholder="Obantoko"
//                 className="border-b-2 border-bl w-60 focus:outline-none py-1"
//               />
//               {formik.errors.pickup && formik.touched.pickup ? (
//                 <small className="text-red-500 text-sm">
//                   {formik.errors.pickup}
//                 </small>
//               ) : (
//                 ""
//               )}
//             </div>
//           </div>
//           <label htmlFor="pickup">
//             <IoPencil />
//           </label>
//         </div>

//         <div className="flex items-center gap-20">
//           <div className="flex gap-4 items-center">
//             <div className="bg-bl p-2 rounded-full w-fit">
//               <CiLocationOn color="white" size={25} />
//             </div>
//             <div className="flex flex-col">
//               <p className="">Destination</p>
//               <input
//                 type="text"
//                 name="destination"
//                 id="destination"
//                 value={formik.values.destination}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 placeholder="Camp"
//                 className="border-b-2 border-bl w-60 focus:outline-none py-1"
//               />
//               {formik.errors.destination && formik.touched.destination ? (
//                 <small className="text-red-500 text-sm">
//                   {formik.errors.destination}
//                 </small>
//               ) : (
//                 ""
//               )}
//             </div>
//           </div>
//           <label htmlFor="destination">
//             <IoPencil />
//           </label>
//         </div>
//         <button
//           type="submit"
//           onClick={formik.handleSubmit}
//           className="bg-gr text-white py-3 rounded-md mt-8 w-[60%] mx-auto">
//           Find a ride
//         </button>
//       </div>
//     </div>
//   );
// }
// export default SelectLocation;
