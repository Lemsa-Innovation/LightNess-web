export const unavailableImage = "/assets/images/no-image-icon.jpg";

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";

export const AUTH_ROUTES = {
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  resetPasswordConfirm: path(ROOTS_AUTH, "/reset-password/confirm"),
};

export const AUTH_PATHS = Object.values(AUTH_ROUTES);

// Only reset password routes are available
export const AVAILABLE_ROUTES = {
  ...AUTH_ROUTES,
};

export const routes = {
  resetPassword: AUTH_ROUTES.resetPassword,
  resetPasswordConfirm: AUTH_ROUTES.resetPasswordConfirm,
};
