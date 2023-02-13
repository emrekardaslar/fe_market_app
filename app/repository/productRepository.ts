import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

const API_BASE_URL = getEnvVariable("API_URL")

export async function getProductComments(id: number) {
    return axios.get(API_BASE_URL + `/comment`, {params: {product_id: id}})
}

export async function getProductRating(id: number, isLoggedIn: boolean) {
    if (isLoggedIn) {
        return axios.get(API_BASE_URL + `/rating`,  {params: {product_id: id}, headers: { "Authorization": `Bearer ${localStorage.getItem("access")}` }})
    }
    return axios.get(API_BASE_URL + `/rating`,  {params: {product_id: id}})
}

export async function createProductComment(id: number, content: string) {
    const options = { headers: {"Authorization" : `Bearer ${localStorage.getItem("access")}`} }
    return axios.post(API_BASE_URL + `/comment`, {product: id, content: content})
}

export async function deleteProductComment(id: number) {
    return axios.delete(API_BASE_URL + `/comment/${id}`)
}

export async function giveProductRating(id: number, stars: number, existingRatingId: any) {
    const options = { headers: {"Authorization" : `Bearer ${localStorage.getItem("access")}`} }
    if (existingRatingId) {
        return axios.put(API_BASE_URL + `/rating/${existingRatingId}/`, {value: stars, product: id}, options);
    }
    return axios.post(API_BASE_URL + `/rating/`, {value: stars, product: id}, options);
}