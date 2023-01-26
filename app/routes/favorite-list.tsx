import { LoaderFunction, ActionFunction, redirect, MetaFunction } from "@remix-run/node";
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

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const addToFavorite =JSON.parse(formData.get("addToFavorite"))
    /* if (formData && addToFavorite) {
        const favorited = await db.favoriteList.findFirst({
            where: {
                productId: addToFavorite.productId,
                userId: addToFavorite.userId
            }
        })
        if (!favorited) {
            await db.favoriteList.create({
                data: {
                    productId: addToFavorite.productId,
                    userId: addToFavorite.userId
                }
            })
        }
        else {
            await db.favoriteList.delete({
                where: {
                    userId_productId: {
                        productId: addToFavorite.productId,
                        userId: addToFavorite.userId
                    }
                }
            })
        }
    } */
    return {}
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
    const { getFavoriteList } = useViewModel();

    useEffect(()=>{
        getFavoriteList().then(res => setFavoriteList(res));
    }, [])

    return (
        <>
            <FavoritesView data={data} favorites={favoriteList}/>
        </>
    )
}

export default FavoriteList