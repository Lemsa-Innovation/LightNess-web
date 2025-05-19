export const openGoogleMaps = (geoPoint: {
  latitude: number;
  longitude: number;
}) => {
  const url = `https://www.google.com/maps?q=${geoPoint.latitude},${geoPoint.longitude}`;
  window.open(url, "_blank");
};
