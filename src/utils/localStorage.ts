interface IUserData {
  email: string;
  name: string;
  lastName: string;
  location: string;
  token: string;
}

export const addUserToLocalStorage = (user: IUserData) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  console.log(result, user, "user-result");
  return user;
};
