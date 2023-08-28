import React from "react";

function SearchView({ results, searchString, baseUrl }: any) {
  return (
    <div className="search-results">
      <div className="search-title">Search results for {searchString}:</div>
      <div className="results-list">
        {results.map((res: any, index: number) => (
          <div className="search-item" key={index}>
            <h1 className="item-name">{res.name}</h1>
            <img className="item-image" src={res.imgLink} alt={res.name} />
            <div className="item-price">${res.price}</div>
            <button
              className="item-button"
              onClick={() => {
                window.location.href =
                  `http://${baseUrl}/products/${res.category_name}/${res.subcategory_name}/${res.id}`.toLowerCase();
              }}
            >
              Go to product page
            </button>
          </div>
        ))}
        {results.length == 0 && <p>No items found</p>}
      </div>
    </div>
  );
}

export default SearchView;
