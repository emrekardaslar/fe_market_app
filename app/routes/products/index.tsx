import { LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import ProductView from "~/views/ProductPage/view"
import useViewModel from "~/views/ProductPage/viewModel";

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
      <ProductView data={data} />
      <Outlet />
    </>
  )
}

export default Products