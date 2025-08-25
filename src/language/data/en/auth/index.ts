import { Auth } from "@/language/structure";

export const auth: Auth = {
  signInProviders: {
    google: {
      continueWith: "Continue with Google",
      toastContents: {
        success: "Connected with Google!",
        error: "Failed to connect with Google. Please try again.",
      },
    },
    facebook: {
      continueWith: "Continue with Facebook",
      toastContents: {
        success: "Connected with Facebook!",
        error: "Failed to connect with Facebook. Please try again.",
      },
    },
    phone: {
      continueWith: "Continue with phone number",
      otpCodeVerify: "OTP Code Verification",
      resendCode: "Resend Code",
      waitingMessage:
        "Please wait {timeRemaining} seconds before you can resend the code.",
      toastContents: {
        success: "Connected with phone number!",
        error: "Failed to connect with phone number. Please try again.",
      },
      messages: {
        success: {
          otpCodeVerificationSuccess: "OTP code verification successful.",
          phoneNumberVerificationSent:
            "Verification code sent successfully to phone number: {phoneNumber} ",
        },
        errors: {
          otpCodeNotMatching:
            "The entered OTP code does not match. Please verify and try again.",
          phoneNumberMissing: "Phone number missing.",
          recaptchaError: "reCAPTCHA verification error. Please try again.",
          phoneNumberVerificationFailed:
            "Phone number verification failed. Please try again.",
          codeExpired:
            "The OTP code has expired. Please request a new code and try again.",
          phoneNumberExistsWithDifferentCredential:
            "A user with this phone number already exists, but with different login credentials. If this is your account, please continue with the verification process. Otherwise, make sure you have entered the correct phone number.",
        },
      },
    },
  },
  signIn: {
    login: "Login",
    header: "Quick access to your dashboard to manage with ease.",
    signIn: "Sign In",
    dontHaveAccount: "Don't have an account yet?",
    selectAnotherMethodLogin: "Select another login method",
    title: "Login",
    description: "Access your account to continue",
    button: "Sign In",
    toastContents: {
      error: "Login failed. Please try again.",
      success: "Wow, that's easy! You're logged in!",
    },
  },
  signup: {
    title: "Complete Your Registration",
    description: "Please fill in your details to complete your account setup",
    button: "Create Account",
    loading: "Validating invitation...",
    invalidToken: "Invalid or expired invitation",
    success: {
      title: "Account Created Successfully!",
      description:
        "Your account has been created and you can now access the platform.",
      button: "Continue to Login",
    },
    errors: {
      invalidToken: "Invalid invitation token",
      tokenExpired: "Invitation token has expired",
      tokenAlreadyUsed: "Invitation token has already been used",
      signupFailed: "Failed to create account. Please try again.",
    },
    appDownload: {
      title: "Download our mobile app to get the full experience:",
      androidButton: "Download for Android",
      iosButton: "Download for iOS",
    },
  },
  resetPassword: {
    title: "Reset Password",
    description: "Enter your email address to receive a reset link",
    button: "Send Reset Link",
    backToLogin: "Back to Login",
    forgotPassword: "Forgot Password?",
    toastContents: {
      success: "Reset link sent successfully! Check your email.",
      error: "Failed to send reset link. Please try again.",
    },
    success: {
      title: "Email Sent!",
      description:
        "We've sent a reset link to your email address. Check your inbox and follow the instructions.",
      button: "Back to Login",
    },
  },
  confirmPassword: {
    title: "Set New Password",
    description: "Enter your new password below",
    button: "Update Password",
    backToLogin: "Back to Login",
    loading: "Validating reset link...",
    invalidLink: "Invalid reset link. Redirecting...",
    success: {
      title: "Password Updated!",
      description:
        "Your password has been successfully updated. You can now sign in with your new password.",
      button: "Sign In",
    },
    errors: {
      invalidToken: "Invalid or expired reset link. Please request a new one.",
      updateFailed: "Failed to update password. Please try again.",
    },
  },
  signOut: {
    logout: "Sign Out",
    toast: {
      error: "Logout failed. Please try again.",
      success: "You are logged out. See you soon!",
    },
  },
  or: "Or",
  fields: {
    email: {
      label: "Email Address",
      placeholder: "Enter your email address",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
    confirmPassword: {
      label: "Confirm Password",
      placeholder: "Confirm your password",
    },
    fullName: {
      label: "Full Name",
      placeholder: "Enter your full name",
    },
    birthday: {
      label: "Date of Birth",
      placeholder: "Select your date of birth",
    },
    gender: {
      label: "Gender",
      placeholder: "Select your gender",
    },
    phoneNumber: {
      label: "Phone Number",
      placeholder: "Enter your phone number",
    },
    country: {
      label: "Country",
      placeholder: "Select your country",
    },
  },
  welcome: "Welcome back",
  errors: {
    networkRequestFailed:
      "Network request failed. Please check your internet connection and try again.",
    emailAlreadyInUse: "Email address is already in use.",
    tooManyRequests: "Too many requests. Please try again later.",
    userNotFound: "User not found.",
    incorrectPassword: "Incorrect password.",
    invalidCredential:
      "The provided credentials are not valid. Please verify and try again.",
    passwordsDoNotMatch: "Passwords do not match.",
    emailNotFound: "No account found with this email address.",
  },
};
