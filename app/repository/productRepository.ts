import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

export async function getProductWithId(id: number) {
    const API_BASE_URL = getEnvVariable("API_URL")
    return axios.get(API_BASE_URL + `/product/${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("jwt")}`} })
}