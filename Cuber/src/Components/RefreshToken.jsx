async function RefreshToken() {
  const url = import.meta.env.VITE_URL;

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await axios.get(`${url}/auth/refreshToken`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    localStorage.removeItem("token", accessToken);
    localStorage.removeItem("refreshToken", refreshToken);
    return null;
  }
}
export default RefreshToken;
