import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
axios.defaults.withCredentials = true

export async function login(username: string, password: string) {
    const API_BASE_URL = getEnvVariable("API_URL")
    const res = await axios.post(API_BASE_URL + "/auth/login/", {username, password});
    return res.data;
}

export async function register(username: string, password: string) {
    let email = username;
    const API_BASE_URL = getEnvVariable("API_URL")
    const res = await axios.post(API_BASE_URL + "/auth/register", {username, email, password});
    return res.data;
}