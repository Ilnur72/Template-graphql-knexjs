export const isLoggedIn = (contextValue) => {
  if (!contextValue.user.id) {
    throw new Error("Unauthorized");
  }
};
