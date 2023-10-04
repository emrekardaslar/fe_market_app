import { useState } from "react";
import { useFilterContext } from "~/context/FilterContext";

function FilterComponent({ categoryNames }: any) {
  const { updateCategory, updatePrice, pageParams, clearFilterData } =
    useFilterContext();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (event: { target: { value: any } }) => {
    const categoryName = event.target.value;
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
    updateCategory(categoryName === selectedCategory ? null : categoryName);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handlePriceChange = () => {
    const { price__gte, price__lte } = formatPrices(minPrice, maxPrice);
    updatePrice(price__gte, price__lte);
  };

  const handleClear = () => {
    clearFilterData();
    setSelectedCategory(null);
    setMaxPrice("");
    setMinPrice("");
  };

  const checkFilters = () => {
    if (!pageParams) {
      return false;
    }
    if (
      selectedCategory == null &&
      pageParams?.price__gte == 0 &&
      pageParams?.price__lte == 9999999999
    ) {
      return false;
    }

    return true;
  };

  const formatPrices = (minPrice: any, maxPrice: any) => {
    const price__gte = Number(minPrice) >= 1 ? Number(minPrice) : 0;
    const price__lte =
      maxPrice == null || maxPrice.toString().trim().length === 0
        ? 9999999999
        : Number(maxPrice);
    return { price__gte, price__lte };
  };

  return (
    <div className="filter-sidebar">
      {/* Price Filters */}
      <div className="price-filters">
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </label>
        <button onClick={handlePriceChange}>Click</button>
      </div>
      {/* Categories */}
      <div className="category-filters">
        {categoryNames.map((name: string) => (
          <label key={name}>
            <input
              type="checkbox"
              checked={selectedCategory === name}
              value={name}
              onChange={handleCategoryChange}
            />
            {name}
          </label>
        ))}
      </div>
      {/* Clear Button for existing filters */}
      {checkFilters() && <button onClick={handleClear}>Clear Filters</button>}
    </div>
  );
}

export default FilterComponent;
