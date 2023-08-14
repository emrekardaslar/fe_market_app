import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

export async function getProductsRepo() {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product");
  return res.data;
}

export async function getCategoriesRepo() {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/category/");
  return res.data.results;
}

export async function getProductWithCategoryRepo(category: string) {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product", {
    params: {
      search: category,
    },
  });
  return res.data;
}

export async function getProductsWithSubCategoryRepo(subcategory: string) {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product", {
    params: {
      search: subcategory,
    },
  });
  return res.data;
}

export async function getProductWithId(id: string) {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + `/product/${id}`);
  return res.data;
}
