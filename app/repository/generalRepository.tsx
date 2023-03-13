import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

export async function getProductsRepo() {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product");
  return res.data;
}

export async function getCategoryNamesRepo() {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/categoryNames");
  let list: any = [];
  res.data.results.forEach((result: any) => {
    !list.includes(result.category) && list.push(result.category);
  });
  return list;
}

export async function getProductWithCategoryRepo(category: string) {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product", {
    params: {
      category: category,
    },
  });
  return res.data;
}

export async function getProductsWithSubCategoryRepo(subcategory: string) {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product", {
    params: {
      subcategory: subcategory,
    },
  });
  return res.data;
}

export async function getProductWithId(id: string) {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product", {
    params: {
      id: id,
    },
  });
  return res.data;
}
