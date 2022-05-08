import API from "./axios";
export const googleLogin = (loginInfo) => {
  return API.post("/api/auth", loginInfo);
};

export const logout = () => {
  return API.get("/api/auth/logout");
};

export const checkAuth = () => {
  return API.get("/api/auth/check");
};
