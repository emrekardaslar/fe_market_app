import { login } from "~/repository/loginRepository";

export default function LoginViewModel() {
  async function getUserData() {
    return null;
  }

  async function loginUser(username: string, password: string) {
    try {
      const user = await login(username, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async function logout() {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");
    }
  }

  return {
    getUserData,
    logout,
    loginUser,
  };
}
