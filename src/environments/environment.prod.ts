export const environment = {
  production: true,
  map: {
    center: [-11209356.066861978, 4764718.121160403],
    zoom: 5,
    projection: 'EPSG:3857'
  },
  geocoder: 'nasumilu',
  services: {
    geocode: 'https://nasumilu.io/services',
    account: 'https://nasumilu.io/auth/token?info=json'
  }
};
