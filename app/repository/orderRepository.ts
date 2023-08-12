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
      order: order.id,
    },
    options
  );
}

export async function getUserOrders() {
  return axios.get(API_BASE_URL + "/order/", {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
}

export async function getUserOrderItems() {
  return axios.get(API_BASE_URL + "/orderItem/", {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
}

export async function deleteUserOrder(id: string) {
  return axios.delete(API_BASE_URL + "/orderItem/" + id, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
}

export async function deleteOrder(id: string) {
  return axios.delete(API_BASE_URL + "/order/" + id, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  });
}

export async function createOrderItems(orderItems: any, userId: any) {
  const options = {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  };

  const order = await axios.post(
    API_BASE_URL + "/order/",
    { user: userId },
    options
  );

  orderItems.forEach((orderItem: any) => {
    return axios.post(
      API_BASE_URL + "/orderItem/",
      {
        quantity: orderItem.quantity,
        product: orderItem.id,
        order: order.data.id,
      },
      options
    );
  });
}
