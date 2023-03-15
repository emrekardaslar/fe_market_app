import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

const API_BASE_URL = getEnvVariable("API_URL");

export async function createOrder(order: any) {
  const options = {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  };
  return axios.post(
    API_BASE_URL + "/orderItem/",
    {
      quantity: order.quantity,
      product: order.id,
    },
    options
  );
}

export async function getUserOrders() {
  return axios.get(API_BASE_URL + "/orderItem/", {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
}
