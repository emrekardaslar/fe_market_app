import { ReactNode, createContext, useContext, useReducer } from "react";
import { UPDATE_CATEGORY } from "~/actions/filterActions";
import { filterReducer } from "~/reducers/filterReducer";
import useViewModel from "app/views/ProductsPage/viewModel";

type FilterContext = {
  updateCategory: (ctName: string) => void;
};

const FilterContext = createContext({} as FilterContext);

type FilterProviderProps = {
  children: ReactNode;
};

export function FilterProvider({ children }: FilterProviderProps) {
  const initialValue: any[] = [];
  const [state, dispatch] = useReducer(filterReducer, initialValue);

  function updateCategory(ctName: string) {
    getFilteredData(
      {
        ...state,
        ctName,
        page: 1,
      },
      UPDATE_CATEGORY
    );
  }

  function getFilteredData(pageParams: any, actionType: string) {
    const { getProductWithFilter } = useViewModel();
    getProductWithFilter(pageParams).then((res) => {
      dispatch({ type: actionType, pageParams });
    });
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}
