import useViewModel from "../views/ProductsPage/viewModel";
import { useFilterContext } from "~/context/FilterContext";
import { useNavigate } from "@remix-run/react";
import { Hpl } from "./UI/HorizontalPl";

function ProductList({ keys }: any) {
  const navigate = useNavigate();
  const { apiResponse } = useFilterContext();
  const { getObject, navigateToProduct } = useViewModel();
  let productsObject = getObject(apiResponse, keys);

  return (
    <div className="product-list">
      {keys?.map((key: string) => (
        <>
          {productsObject[key].length > 0 ? (
            <>
              {" "}
              <h1
                style={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginLeft: "0.3rem",
                }}
              >
                {key}
              </h1>
              <Hpl
                products={productsObject[key]}
                onClick={(product) => navigateToProduct(product, navigate)}
                button={true}
                base="products"
              />
            </>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}

export default ProductList;
