export const ERROR = {
  authError: (error, AuthErrorCodes) => {
    const errorMessage = {};
    switch (error.code) {
      case AuthErrorCodes.INVALID_PASSWORD:
        errorMessage.firebaseError = "Password incorrect. Please try again.";
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        errorMessage.firebaseError =
          "Too many attempts. Please try again later.";
        break;
      case "auth/user-not-found":
        errorMessage.firebaseError = "User does not exist.";
        break;
      default:
        errorMessage.firebaseError = "Invalid email address or password. Please try again.";
        break;
    }
    return errorMessage;
  },
};
