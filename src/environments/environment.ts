// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  BASE1_URL:"/home/redapple069/Downloads/all_data.zip",
  BASE_URL:`http://digitaxapi-env.eba-nrr834zb.us-east-1.elasticbeanstalk.com:8080`,
  CAPTCHA_URL   :`https://www.google.com/recaptcha/api/siteverify`,
  secret_key:"6LdoiLwZAAAAADmQpBrZnki6eFbWJS-WaD1r1luU",
  site_key:"6LdoiLwZAAAAANJ-MV-ZORWzs8IwU1IjDPJcXnvn",
  default_error_message:"Sorry, an error occurred. Please email support@digitaltaxusa.com",
  autoload:"https://www.google.com/recaptcha/api.js?render=6LdoiLwZAAAAANJ-MV-ZORWzs8IwU1IjDPJcXnvn",
  title:"DIGITAX",
  signin_privacy:"By clicking Sign In, you agree to Digital Tax USA Terms of Service and Terms of Use. And have read and acknowledge our Privacy Statement.",

  signup_privacy:"By clicking Sign Up, you agree to Digital Tax USA Terms of Service and Terms of Use. And have read and acknowledge our Privacy Statement.",

  privacy_title:"Digital Tax USA",
  phone_code:"+91"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
