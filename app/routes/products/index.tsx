import { LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import ProductsView from "~/views/ProductsPage/view"
import useViewModel from "~/views/ProductsPage/viewModel";

export let loader: LoaderFunction = async () => {
  const { getProducts, getCategoryNames } = useViewModel();
  let products = await getProducts();
  let categoryNames = await getCategoryNames()
  return { products, categoryNames }
}

function Products() {
  const data = useLoaderData();

  return (
    <>
      <ProductsView data={data} />
      <Outlet />
    </>
  )
}

export default Products