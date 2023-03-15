import axios from "axios";
import { getEnvVariable } from "~/utils/helper";

const API_BASE_URL = getEnvVariable("API_URL");

export async function createOrder(order: any) {
  console.log(order);
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
