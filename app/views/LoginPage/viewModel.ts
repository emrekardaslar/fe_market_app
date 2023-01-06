import { login } from "~/repository/loginRepository";

export default function LoginViewModel () {
    async function getUserData() {
        if (localStorage.getItem("jwt")) {
            return localStorage.getItem("jwt")
        }
        return null;
    }


    return {
        getUserData
    }
}