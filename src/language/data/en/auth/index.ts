import {Auth} from "@/language/structure";

export const auth: Auth = {
    signInProviders: {
        google: {
            continueWith: "Continue with Google",
            toastContents: {
                success: "Connected with Google!",
                error: "Failed to connect with Google. Please try again."
            }
        },
        facebook: {
            continueWith: "Continue with Facebook",
            toastContents: {
                success: "Connected with Facebook!",
                error: "Failed to connect with Facebook. Please try again."
            }
        },
        phone: {
            continueWith: "Continue with phone number",
            otpCodeVerify: "OTP Code Verification",
            resendCode: "Resend Code",
            waitingMessage: "Please wait {timeRemaining} seconds before you can resend the code.",
            toastContents: {
                success: "Connected with phone number!",
                error: "Failed to connect with phone number. Please try again."
            },
            messages: {
                success: {
                    otpCodeVerificationSuccess: "OTP code verification successful.",
                    phoneNumberVerificationSent: "Verification code sent successfully to phone number: {phoneNumber} ",
                },
                errors: {
                    otpCodeNotMatching: "The entered OTP code does not match. Please verify and try again.",
                    phoneNumberMissing: "Phone number missing.",
                    recaptchaError: "reCAPTCHA verification error. Please try again.",
                    phoneNumberVerificationFailed: "Phone number verification failed. Please try again.",
                    codeExpired: "The OTP code has expired. Please request a new code and try again.",
                    phoneNumberExistsWithDifferentCredential: "A user with this phone number already exists, but with different login credentials. If this is your account, please continue with the verification process. Otherwise, make sure you have entered the correct phone number.",
                }
            }
        }
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
        }
    },
    signOut: {
        logout: "Sign Out",
        toast: {
            error: "Logout failed. Please try again.",
            success: "You are logged out. See you soon!",
        }
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
    },
    welcome: "Welcome back",
    errors: {
        networkRequestFailed: "Network request failed. Please check your internet connection and try again.",
        emailAlreadyInUse: "Email address is already in use.",
        tooManyRequests: "Too many requests. Please try again later.",
        userNotFound: "User not found.",
        incorrectPassword: "Incorrect password.",
        invalidCredential: "The provided credentials are not valid. Please verify and try again."
    },
}
