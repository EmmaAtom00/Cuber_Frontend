function GetLocation() {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        },
        (error) => {
          return error.message;
        }
      );
    }
  };
  const userLocation = getLocation();
  //   console.log(userLocation);
  return userLocation;
}

export default GetLocation;
