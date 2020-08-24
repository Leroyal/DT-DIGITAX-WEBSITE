// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  BASE_URL:`http://digitaxapi-env.eba-nrr834zb.us-east-1.elasticbeanstalk.com:8080`,
  CAPTCHA_URL   :`https://www.google.com/recaptcha/api/siteverify`,
  secret:"6LdoiLwZAAAAADmQpBrZnki6eFbWJS-WaD1r1luU",
  site:"6LdoiLwZAAAAANJ-MV-ZORWzs8IwU1IjDPJcXnvn",
  error_message:"Sorry, an error occurred. Please email support@digitaltaxusa.com",
  autoload:"https://www.google.com/recaptcha/api.js?render=6LdoiLwZAAAAANJ-MV-ZORWzs8IwU1IjDPJcXnvn"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
