import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

export async function getFavoriteListRepo() {
    const API_BASE_URL = getEnvVariable("API_URL")
    const res = await axios.get(API_BASE_URL + "/favoriteList", { headers: {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} });
    return res.data;
}