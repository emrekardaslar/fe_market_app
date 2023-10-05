import axios from "axios";
import { Filters } from "~/models/filter";
import { getEnvVariable } from "~/utils/helper";

export async function getProductsRepo() {
  const API_BASE_URL = getEnvVariable("API_URL");
  const res = await axios.get(API_BASE_URL + "/product/");
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

export async function getFilterData({
  ctName,
  price__gte,
  price__lte,
}: Filters): Promise<any> {
  const API_BASE_URL = getEnvVariable("API_URL");
  let params = [];

  if (ctName) {
    params.push("subcategory__category__name=" + ctName);
  }
  if (price__gte != null) {
    params.push("price__gte=" + price__gte);
  }
  if (price__lte != null) {
    params.push("price__lte=" + price__lte);
  }

  return axios.get(API_BASE_URL + "/product/?" + params.join("&"));
}
