import { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import moment from 'moment';
import ProductPage from '~/views/ProductPage/view';
import { capitalizeFirstLetter } from '~/utils/helper';
import useViewModel from "~/views/ProductPage/viewModel";
import useFavoritelistViewModel from "~/views/FavoritesPage/viewModel";
import { useEffect, useState } from 'react';

export const loader: LoaderFunction = async ({ params }) => {
    const { getProduct, getComments, getRating } = useViewModel();
    let product = await getProduct(params.id);
    let comments = await getComments(params.id);  
    let rating = await getRating(params.id);

    comments.forEach((comment: any) => {
        comment.author = comment.user.username
        comment.avatar = 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
        comment.datetime = moment(comment.created_at).fromNow()
    })

    return { product: product, comments: comments, rating: rating }
};

export const meta: MetaFunction<typeof loader> = ({
    data,
  }) => {
    const { product } = data;
    return {
      title:capitalizeFirstLetter(product.name),
      description: product.description,
    };
  };

function ProductDetail() {
    const data = useLoaderData();
    const [favoriteList, setFavoriteList] = useState([]);
    const [update, setUpdate] = useState(false);
    const { getFavoriteList } = useFavoritelistViewModel();

    useEffect(()=>{
        getFavoriteList().then(res => {setFavoriteList(res)});
    }, [update])
    
    return (
        <ProductPage product={data.product} comments={data.comments} favoriteList={favoriteList} setUpdate={setUpdate}/>
    )
}

export default ProductDetail