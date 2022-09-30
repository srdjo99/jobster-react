export const addUserToLocalStorage = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user));
};
