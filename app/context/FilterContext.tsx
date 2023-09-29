import { ReactNode, createContext, useContext, useReducer } from "react";
import { UPDATE_CATEGORY, UPDATE_PRICE } from "~/actions/filterActions";
import { filterReducer } from "~/reducers/filterReducer";
import useViewModel from "app/views/ProductsPage/viewModel";

type FilterContext = {
  updateCategory: (ctName: string) => void;
  updatePrice: (price__gte: number, price__lte: number) => void;
  apiResponse: any;
};

const FilterContext = createContext({} as FilterContext);

type FilterProviderProps = {
  children: ReactNode;
};

export function FilterProvider({
  children,
  initialValue,
}: FilterProviderProps) {
  const [state, dispatch] = useReducer(filterReducer, { ...initialValue });

  function updateCategory(ctName: string) {
    getFilteredData(
      {
        ...state.pageParams,
        ctName,
        page: 1,
      },
      UPDATE_CATEGORY
    );
  }

  function updatePrice(price__gte: number, price__lte: number) {
    getFilteredData(
      {
        ...state.pageParams,
        price__gte,
        price__lte,
        page: 1,
      },
      UPDATE_PRICE
    );
  }

  function getFilteredData(pageParams: any, actionType: string) {
    const { getProductWithFilter } = useViewModel();
    getProductWithFilter(pageParams).then((res) => {
      dispatch({ type: actionType, pageParams, response: res.data.results });
    });
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateCategory,
        updatePrice,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}
