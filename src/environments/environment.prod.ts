// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  baseUrl: 'http://imperial-recruitment.herokuapp.com/',
  authURL: 'http://localhost:5000/',
   firebaseConfig : {
    apiKey: "AIzaSyBn3Qgdeotyhwqvi3D_PzZBhXspA0HG1-s",
    authDomain: "crud-1054b.firebaseapp.com",
    databaseURL: "https://crud-1054b.firebaseio.com",
    projectId: "crud-1054b",
    storageBucket: "crud-1054b.appspot.com",
    messagingSenderId: "55050072470",
    appId: "1:55050072470:web:4d7f40717ad04c6f1f2db7",
    measurementId: "G-N0ZT91P3SV"
  }
};

/*
  authURL: 'http://localhost:5000/',
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
