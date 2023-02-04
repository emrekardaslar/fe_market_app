import { LoaderFunction, redirect, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react";
import { checkJwtExpire, getAccessToken } from "~/utils/helper";
import FavoritesView from "~/views/FavoritesPage/view";
import useViewModel from "../views/FavoritesPage/viewModel";

export let loader: LoaderFunction = async ({ request }) => {
    const expired = await checkJwtExpire(request)
    if (expired) throw redirect('/login')
    const accessToken = await getAccessToken(request)
    return {token: accessToken, baseUrl: process.env.REACT_APP_BASE_URL, isLoggedIn: true};
};

export const meta: MetaFunction<typeof loader> = () => {
    return {
      title: "Favorite List",
      description: "Your favorite products"
    };
};

function FavoriteList() {
    const data = useLoaderData();
    const [favoriteList, setFavoriteList] = useState([]);
    const [update, setUpdate] = useState(false);
    const { getFavoriteList } = useViewModel();

    useEffect(()=>{
        getFavoriteList().then(res => {setFavoriteList(res)});
    }, [update])

    return (
        <>
            <FavoritesView data={data} favorites={favoriteList} setUpdate={setUpdate}/>
        </>
    )
}

export default FavoriteList