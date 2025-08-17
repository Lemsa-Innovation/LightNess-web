import { ToastContents } from "../inputs";

export interface Auth {
  signInProviders: {
    google: {
      continueWith: string;
      toastContents: ToastContents;
    };
    facebook: {
      continueWith: string;
      toastContents: ToastContents;
    };
    phone: {
      continueWith: string;
      otpCodeVerify: string;
      resendCode: string;
      waitingMessage: string;
      toastContents: ToastContents;
      messages: {
        success: {
          otpCodeVerificationSuccess: string;
          phoneNumberVerificationSent: string;
        };
        errors: {
          otpCodeNotMatching: string;
          phoneNumberMissing: string;
          recaptchaError: string;
          phoneNumberVerificationFailed: string;
          codeExpired: string;
          phoneNumberExistsWithDifferentCredential: string;
        };
      };
    };
  };
  signIn: {
    login: string;
    signIn: string;
    header: string;
    dontHaveAccount: string;
    selectAnotherMethodLogin: string;
    toastContents: ToastContents;
    title: string;
    description: string;
    button: string;
  };
  signOut: {
    logout: string;
    toast: ToastContents;
  };
  or: string;
  fields: {
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
  };
  errors: {
    networkRequestFailed: string;
    emailAlreadyInUse: string;
    tooManyRequests: string;
    userNotFound: string;
    incorrectPassword: string;
    invalidCredential: string;
  };
  welcome: string;
}
