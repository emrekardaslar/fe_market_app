import { getProductWithId } from "~/repository/generalRepository";
import { getProductComments, getProductRating, giveProductRating } from "~/repository/productRepository";
import useFavoriteViewModel from "../FavoritesPage/viewModel";

export default function ProductViewModel() {
    const { addToFavorites, removeFromFavorites } = useFavoriteViewModel();

    async function getProduct(id: string) {
        const response = await getProductWithId(id);
        return response.results[0];
    }
    
    async function getComments(id: number) {
        const response = await getProductComments(id);
        return response.data.results;
    }

    async function getRating(id: number) {
        const response = await getProductRating(id);
        return response.data.results;
    }

    async function createComment() {

    }

    async function deleteComment() {

    }

    async function giveRating(id: number, stars: number) {
        const response = await giveProductRating(id, stars);
        return response.data.results;
    }

    const addToFavorite = async (productId: any, favoriteList: any, setUpdate: any) => {
        if (isFavorited(productId, favoriteList)) {
            favoriteList.forEach(async (item: any) => {
                if (item.product.id == productId) {
                    await removeFromFavorites(item.id)
                    setUpdate(Math.random());
                }
            })
        }
        else {
            await addToFavorites(productId)
            setUpdate(Math.random());
        }
    }

    const isFavorited = (productId: any, favoriteList: any) => {
        let result = false;
        favoriteList.forEach((item: any) => {
            if (item.product.id == productId) {
                result = true;
            }
        })
        return result;
    }

    return {
        getComments,
        getRating,
        createComment,
        deleteComment,
        giveRating,
        getProduct,
        addToFavorite,
        isFavorited,
    }
}