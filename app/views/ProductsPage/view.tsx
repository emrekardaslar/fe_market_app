import { FilterProvider } from "~/context/FilterContext";
import FilterComponent from "~/components/filterComponents/FilterComponent";
import ProductList from "~/components/ProductList";

function ProductsView({ data }: any) {
  let keys = data.categoryNames.map((categoryName: any) => categoryName.name);

  return (
    <>
      <FilterProvider initialValue={{ apiResponse: data.products.results }}>
        <FilterComponent categoryNames={keys} />
        <ProductList keys={keys} />
      </FilterProvider>
    </>
  );
}

export default ProductsView;
