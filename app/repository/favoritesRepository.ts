import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

export async function getFavoriteListRepo() {
    const API_BASE_URL = getEnvVariable("API_URL")
    const res = await axios.get(API_BASE_URL + "/favoriteList", { headers: {"Authorization" : `Bearer ${localStorage.getItem("access")}`} });
    return res.data.results;
}

export async function removeFromFavoritesRepo(productId: string) {
    const API_BASE_URL = getEnvVariable("API_URL")
    const res = await axios.delete(API_BASE_URL + `/favoriteList/${productId}/`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("access")}`} });
    return res.data.results;
}