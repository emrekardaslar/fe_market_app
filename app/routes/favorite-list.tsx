import { LoaderFunction, ActionFunction, redirect, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { getUserId } from "~/services/sesssion.server";
import { db } from "~/utils/db.server";
import FavoritesView from "~/views/FavoritesPage/view";


export let loader: LoaderFunction = async ({ request }) => {
    let userId = await getUserId(request);
    if (!userId) throw redirect('/login')
    const favoriteList = await db.favoriteList.findMany({
        where: {
            userId: userId
        },
        select: {
            productId: true
        }
    })

    let list: any = [];
    favoriteList.forEach(item => list.push(item.productId))

    const favoriteProducts = await db.product.findMany({
        where: {
            id: {
                in: list
            }
        }
    })

    return {user: userId, favoriteList: favoriteProducts, baseUrl: process.env.REACT_APP_BASE_URL};
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const addToFavorite =JSON.parse(formData.get("addToFavorite"))
    if (formData && addToFavorite) {
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
    }
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

    return (
        <>
            <FavoritesView data={data}/>
        </>
    )
}

export default FavoriteList