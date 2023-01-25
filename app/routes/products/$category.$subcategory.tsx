import { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import CategoryPage from '~/components/CategoryPage'
import { getUserId } from '~/services/sesssion.server'
import { db } from '~/utils/db.server'
import { capitalizeFirstLetter } from '~/utils/helper'
import useViewModel from "../../views/ProductsPage/viewModel";

export const loader: LoaderFunction = async ({ request, params }: any) => {
    let userId = await getUserId(request);
    const { getProductsWithSubCategory } = useViewModel();
    const res = await getProductsWithSubCategory(params.subcategory);
    let products = res.results;
    let list: any = [];
    //TODO: pass favorite list
    return { products, list, userId }
}

export const action: ActionFunction = async ({ request, params }): Promise<any> => {
    const formData = await request.formData();
    const addToFavorite = JSON.parse(formData.get("addToFavorite"))
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
}

export const meta: MetaFunction<typeof loader> = ({
    params,
}) => {
    const { subcategory } = params;
    return {
        title: capitalizeFirstLetter(`${subcategory}`),
        description: subcategory,
    };
};

function Subcategory() {
    const data = useLoaderData();
    return (
        <>
            <CategoryPage data={data.products} favoriteList={data.list} userId={data.userId} />
            <Outlet />
        </>
    )
}

export default Subcategory
