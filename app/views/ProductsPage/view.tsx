import { FilterProvider } from "~/context/FilterContext";
import FilterComponent from "~/components/filterComponents/FilterComponent";
import ProductList from "~/components/ProductList";

function ProductsView({ data }: any) {
  let keys = data.categoryNames.map((categoryName: any) => categoryName.name);

  return (
    <>
      <FilterProvider initialValue={{ apiResponse: data.products.results }}>
        <div className="main-container ">
          <FilterComponent categoryNames={keys} />
          <ProductList keys={keys} base={"products"} />
        </div>
      </FilterProvider>
    </>
  );
}

export default ProductsView;
