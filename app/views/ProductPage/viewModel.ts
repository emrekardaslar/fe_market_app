import { getProductWithId } from "~/repository/generalRepository";
import {
  createProductComment,
  deleteCommentWithId,
  editCommentWithId,
  getProductComments,
  getProductRating,
  giveProductRating,
} from "~/repository/productRepository";
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

  async function getRating(id: number, isLoggedIn: boolean) {
    const response = await getProductRating(id, isLoggedIn);
    return response.data.results;
  }

  async function createComment(id: number, content: any, userId: number) {
    const response = await createProductComment(id, content, userId);
    return response.data;
  }

  async function deleteComment(id: number) {
    const response = await deleteCommentWithId(id);
    return response.data.results;
  }

  async function editComment(
    id: number,
    productId: number,
    content: string,
    userId: number
  ) {
    const response = await editCommentWithId(id, productId, content, userId);
    return response.data.results;
  }

  async function giveRating(id: number, stars: number, existingRatingId: any) {
    const response = await giveProductRating(id, stars, existingRatingId);
    return response.data.results;
  }

  function getUserId() {
    // Get the JWT token from local storage
    const token = localStorage.getItem("access");
    if (token && token != "undefined") {
      // Decode the token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      // Get the user ID from the decoded token
      const userId = decodedToken.user_id;
      return userId;
    }
  }

  const addToFavorite = async (
    productId: any,
    favoriteList: any,
    setUpdate: any
  ) => {
    if (isFavorited(productId, favoriteList)) {
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

  const isFavorited = (productId: any, favoriteList: any) => {
    let result = false;
    favoriteList.forEach((item: any) => {
      if (item.product.id == productId) {
        result = true;
      }
    });
    return result;
  };

  return {
    getComments,
    getRating,
    createComment,
    deleteComment,
    giveRating,
    getProduct,
    addToFavorite,
    isFavorited,
    getUserId,
    editComment,
  };
}
