import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

const options = { headers: {"Authorization" : `Bearer ${localStorage.getItem("access")}`} }
const API_BASE_URL = getEnvVariable("API_URL")

export async function getProductWithId(id: number) {
    return axios.get(API_BASE_URL + `/product/${id}`)
}

export async function getProductComments(id: number) {
    return axios.get(API_BASE_URL + `/comment`, {params: {product_id: id}})
}

export async function createProductComment(id: number, content: string) {
    return axios.post(API_BASE_URL + `/comment`, {product: id, content: content})
}

export async function deleteProductComment(id: number) {
    return axios.delete(API_BASE_URL + `/comment/${id}`)
}

export async function giveProductRating(id: number, stars: number) {
    return axios.post(API_BASE_URL + `/rating/`, {value: stars, product: id})
}