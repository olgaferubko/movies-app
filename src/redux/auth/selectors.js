export const selectAuthState = (state) => state.auth;
export const selectToken = (state) => selectAuthState(state).token;
export const selectIsLoggedIn = (state) => selectAuthState(state).isLoggedIn;
export const selectAuthLoading = (state) => selectAuthState(state).isLoading;
export const selectAuthError = (state) => selectAuthState(state).error;