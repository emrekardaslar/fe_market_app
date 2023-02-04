import { useNavigate } from "@remix-run/react";
import { notification } from "antd";
import { getFavoriteListRepo } from "~/repository/favoritesRepository";
import { deleteFavoriteProduct } from "~/repository/generalRepository";

export default function FavoritesViewModel () {
    const navigate = useNavigate();

    const cartAddedNotification = (name: string, price: number) => {
        notification.open({
            message: `${name} added to your cart`,
            description:
                `${name} added to your cart for  $ ${price}`,
            onClick: () => {
                navigate("/cart")
            },
        });
    };

    async function removeFromFavorites(id: string) {
        const res = await deleteFavoriteProduct(id);
        return res;
    }

    async function getFavoriteList() {
        const favorites = await getFavoriteListRepo();
        const list: any = [];
        favorites.forEach((res: any) => {
            list.push({id: res.id, product: res.product[0]})
        })
        return list;
    }

    return {
        cartAddedNotification,
        removeFromFavorites,
        getFavoriteList
    }
}