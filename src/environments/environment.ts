// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
      feature: "http://localhost:8080/services/issue-trac/issues/search/findAllWithinBbox"
    },
    // geocode: 'https://nasumilu.io/services',
    geocode: 'https://localhost:8000/services',
    account: 'https://nasumilu.io/auth/token',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
