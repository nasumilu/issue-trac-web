export const environment = {
  production: true,
  account: {
    iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_pcb3eM7rq'
  },
  map: {
    center: [-11209356.066861978, 4764718.121160403],
    zoom: 5,
    projection: 'EPSG:3857',
    extent: [-14885586.074855622, 1817049.417419917,-6454471.852344695, 7340067.293938433]
  },
  geocoder: 'nasumilu',
  services: {
    issues: {
      feature: "https://nasumilu.io/services/issue-trac/issues/search/findAllWithinBbox"
    },
    geocode: 'https://nasumilu.io/services',
    account: 'https://nasumilu.io/auth/token',
  }
};
