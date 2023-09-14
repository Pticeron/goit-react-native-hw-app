export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectUserId = (state) => state.auth.uid;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;
