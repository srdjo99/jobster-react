export const addUserToLocalStorage = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = (): any => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
