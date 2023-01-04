import { useFetcher, useNavigate } from "@remix-run/react";
import { notification } from "antd";

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

    return {
        cartAddedNotification,
        removeFromFavorites
    }
}