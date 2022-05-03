import API from "./axios";
export const login = (loginInfo) => {
  return API.post("/api/auth/signup", loginInfo);
};

export const signup = (loginInfo) => {
  return API.post("/api/auth/signup", loginInfo);
};
