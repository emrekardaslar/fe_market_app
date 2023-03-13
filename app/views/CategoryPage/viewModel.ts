import { useNavigate } from "@remix-run/react";
import { notification } from "antd";
import useFavoriteViewModel from "../FavoritesPage/viewModel";

export default function CategoryViewModel(favoriteList: any, setUpdate: any) {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites } = useFavoriteViewModel();

  const cartAddedNotification = (name: string, price: number) => {
    notification.open({
      message: `${name} added to your cart`,
      description: `${name} added to your cart for  $ ${price}`,
      onClick: () => {
        navigate("/cart");
      },
    });
  };

  const addToFavorite = async (productId: any) => {
    if (isFavorited(productId)) {
      favoriteList.forEach(async (item: any) => {
        if (item.product.id == productId) {
          await removeFromFavorites(item.id);
          setUpdate(Math.random());
        }
      });
    } else {
      await addToFavorites(productId);
      setUpdate(Math.random());
    }
  };

  const isFavorited = (productId: any) => {
    let result = false;
    favoriteList.forEach((item: any) => {
      if (item.product.id == productId) {
        result = true;
      }
    });
    return result;
  };

  return {
    cartAddedNotification,
    addToFavorite,
    isFavorited,
  };
}
