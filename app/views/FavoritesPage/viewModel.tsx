import { useFetcher, useNavigate } from "@remix-run/react";
import { notification } from "antd";
import { getFavoriteListRepo } from "~/repository/favoritesRepository";
import { getProductWithId } from "~/repository/generalRepository";

export default function FavoritesViewModel () {
    const fetcher = useFetcher();
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

    const removeFromFavorites = (productId: any, user: string) => {
        fetcher.submit(
            {addToFavorite: JSON.stringify({productId: productId, userId: user})},
            {method: 'post'}
        )
    }

    async function getFavoriteList() {
        const favorites = await getFavoriteListRepo();
        const list: any = [];
         /* list.push(item.product) */
        return favorites;
    }

    return {
        cartAddedNotification,
        removeFromFavorites,
        getFavoriteList
    }
}