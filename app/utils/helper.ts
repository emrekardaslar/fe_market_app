export const getHeaderItems = (data: any, headerItems: any) => {
    let items = headerItems;
    if (data && data.user) {
        let newItems: { key: any; label: any; }[] = [];
        Object.keys(items).forEach(idx => {
            if (items[idx].key !== "Register" && items[idx].key !== "Login") {
                newItems.push({key: items[idx].key, label: items[idx].label})
            }
        })
        items = newItems;
    }
    else {
        let newItems: { key: any; label: any; }[] = [];
        Object.keys(items).forEach(idx => {
            if (items[idx].key !== "Logout") {
                newItems.push({key: items[idx].key, label: items[idx].label})
            }
        })
        items = newItems;
    }
    return items;
}

export const getTotalPrice = (items: any) => {
    let totalPrice = 0.0;
    items.forEach((item:any) => {
        totalPrice += item.product.price * item.quantity
    })
    return totalPrice.toFixed(2)
}
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getEnvVariable(key: string) {
    if (typeof window == "undefined") {
        //SSR
        return process.env.API_URL;
    }
    else {
        //CSR
        return window.ENV[key];
    }
}