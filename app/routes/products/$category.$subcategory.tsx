import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import CategoryPage from '~/components/CategoryPage'
import { getUserId } from '~/services/sesssion.server'
import { capitalizeFirstLetter } from '~/utils/helper'
import useViewModel from "../../views/ProductsPage/viewModel";
import useFavoriteViewModel from "../../views/FavoritesPage/viewModel";
import { useEffect, useState } from 'react'

export const loader: LoaderFunction = async ({ request, params }: any) => {
    let userId = await getUserId(request);
    const { getProductsWithSubCategory } = useViewModel();
    const res = await getProductsWithSubCategory(params.subcategory);
    let products = res.results;
    return { products, userId }
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
    const { getFavoriteList } = useFavoriteViewModel();
    const [favoriteList, setFavoriteList] = useState([]);
    const [update, setUpdate] = useState(0);
    const data = useLoaderData();

    useEffect(()=>{
        getFavoriteList().then(res => setFavoriteList(res));
    }, [update])

    return (
        <>
            <CategoryPage data={data.products} favoriteList={favoriteList} setUpdate={setUpdate} />
            <Outlet />
        </>
    )
}

export default Subcategory
