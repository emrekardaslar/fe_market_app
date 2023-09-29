import { useState } from "react";
import { useFilterContext } from "~/context/FilterContext";

function FilterComponent({ categoryNames }: any) {
  const { updateCategory, updatePrice } = useFilterContext();
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

  const formatPrices = (minPrice: any, maxPrice: any) => {
    const price__gte = Number(minPrice) >= 1 ? Number(minPrice) : 0;
    const price__lte =
      maxPrice == null || maxPrice.toString().trim().length === 0
        ? 9999999999
        : Number(maxPrice);
    return { price__gte, price__lte };
  };

  return (
    <>
      <div>
        {/* Price Filters */}
        <div>
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
        {categoryNames.map((name: string) => (
          <>
            <label>
              <input
                type="checkbox"
                checked={selectedCategory == name ? true : false}
                value={name}
                onChange={handleCategoryChange}
              />
              {name}
            </label>
            <br></br>
          </>
        ))}
      </div>
    </>
  );
}

export default FilterComponent;
