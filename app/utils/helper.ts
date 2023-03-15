import { jwtCookie } from "~/services/cookie.server";

export const getHeaderItems = (data: any, headerItems: any) => {
  let items = headerItems;
  if (data && data.token && !data.expired) {
    let newItems: { key: any; label: any }[] = [];
    Object.keys(items).forEach((idx) => {
      if (items[idx].key !== "Register" && items[idx].key !== "Login") {
        newItems.push({ key: items[idx].key, label: items[idx].label });
      }
    });
    items = newItems;
  } else {
    let newItems: { key: any; label: any }[] = [];
    Object.keys(items).forEach((idx) => {
      if (items[idx].key !== "Logout") {
        newItems.push({ key: items[idx].key, label: items[idx].label });
      }
    });
    items = newItems;
  }
  return items;
};

export const getTotalPrice = (items: any) => {
  let totalPrice = 0.0;
  items.forEach((item: any) => {
    totalPrice += item.product.price * item.quantity;
  });
  return totalPrice.toFixed(2);
};
export function capitalizeFirstLetter(string: string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export function getEnvVariable(key: string) {
  if (typeof window == "undefined") {
    //SSR
    return process.env.API_URL;
  } else {
    //CSR
    return window.ENV[key];
  }
}

export async function checkJwtExpire(request: any) {
  const jwt = require("jsonwebtoken");
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await jwtCookie.parse(cookieHeader);
  if (cookie) {
    try {
      const decoded = jwt.verify(
        cookie.user.access,
        "django-insecure-xw4v0=hs-*kcb30xz)pswr=0*^or^(!7foyfo6*8c_&lb&f6hk"
      );
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      if (exp < now) {
        console.log("Cookie has expired");
        return true;
      } else {
        console.log("Cookie is still valid");
        return false;
      }
    } catch (e) {
      console.log("Cookie has expired");
      return true;
    }
  } else {
    return true;
  }
}

export async function getAccessToken(request: any) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await jwtCookie.parse(cookieHeader);
  if (cookie) {
    return cookie.user.access;
  }
}

export function getCookieItem(key: string) {
  const cookies = document.cookie;
  const cookieItem = cookies.split(";").find((c) => c.startsWith(`${key}=`));
  if (cookieItem) {
    return cookieItem.split("=")[1];
  }
  return null;
}
