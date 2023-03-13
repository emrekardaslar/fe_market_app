import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import moment from "moment";
import ProductPage from "~/views/ProductPage/view";
import { capitalizeFirstLetter, checkJwtExpire } from "~/utils/helper";
import useViewModel from "~/views/ProductPage/viewModel";
import useFavoritelistViewModel from "~/views/FavoritesPage/viewModel";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { getProduct, getComments } = useViewModel();
  let product = await getProduct(params.id);
  let comments = await getComments(params.id);
  const isLoggedIn = !(await checkJwtExpire(request));

  comments.forEach((comment: any) => {
    comment.author = comment.user.username;
    comment.avatar =
      "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png";
    comment.datetime = moment(comment.created_at).fromNow();
  });

  return { product: product, comments: comments, isLoggedIn: isLoggedIn };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { product } = data;
  return {
    title: capitalizeFirstLetter(product.name),
    description: product.description,
  };
};

function ProductDetail() {
  const data = useLoaderData();
  const [favoriteList, setFavoriteList] = useState([]);
  const [update, setUpdate] = useState(false);
  const { getFavoriteList } = useFavoritelistViewModel();

  useEffect(() => {
    if (data.isLoggedIn)
      getFavoriteList().then((res) => {
        setFavoriteList(res);
      });
  }, [update]);

  return (
    <ProductPage
      product={data.product}
      comments={data.comments}
      favoriteList={favoriteList}
      setUpdate={setUpdate}
      isLoggedIn={data.isLoggedIn}
    />
  );
}

export default ProductDetail;
