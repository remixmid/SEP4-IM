import { loginUser as mockLogin, registerUser as mockRegister } from "../api/mockAuthApi.js";

export const authService = {
  login: mockLogin,
  register: mockRegister,
};
