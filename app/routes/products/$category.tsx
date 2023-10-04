import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Hpl } from "~/components/UI/HorizontalPl";
import useViewModel from "~/views/ProductsPage/viewModel";

export let loader: LoaderFunction = async ({ params }) => {
  const category: any = params.category;
  const { getProductsWithCategory } = useViewModel();
  const res = await getProductsWithCategory(category);
  let products = res.results;
  return { products, category };
};

function Category() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { navigateToProductFromSubCategory } = useViewModel();

  return (
    <>
      <h1
        style={{
          fontWeight: "bold",
          textTransform: "capitalize",
          marginLeft: "0.3rem",
        }}
      >
        {data.category}
      </h1>
      <Hpl
        products={data.products}
        onClick={(product) =>
          navigateToProductFromSubCategory(product, navigate)
        }
        button={true}
        base="category"
      />
    </>
  );
}

export default Category;
