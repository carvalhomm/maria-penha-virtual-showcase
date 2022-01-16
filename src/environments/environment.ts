// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlEndpoint: 'https://us-central1-maria-penha-virtual-dev.cloudfunctions.net',
  firebaseConfig: {
    apiKey: "AIzaSyBmT_XxKZztS8fPx_XrUicpLAKjY4_py50",
    authDomain: "maria-penha-virtual-dev.firebaseapp.com",
    databaseURL: "https://maria-penha-virtual-dev-default-rtdb.firebaseio.com",
    projectId: "maria-penha-virtual-dev",
    storageBucket: "maria-penha-virtual-dev.appspot.com",
    messagingSenderId: "829050824017",
    appId: "1:829050824017:web:9e6977308f71ac0f259f70",
    measurementId: "G-C6FS34FLGJ"
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
