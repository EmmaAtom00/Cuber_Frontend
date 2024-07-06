// import axios from "axios";
// import RefreshToken from "./RefreshToken";

// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_URL,
// });

// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const newAccessToken = await RefreshToken();

//       if (newAccessToken) {
//         axios.defaults.headers.common["authorization"] = newAccessToken;
//         return AxiosInstance(originalRequest);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
// export default Interceptor;
