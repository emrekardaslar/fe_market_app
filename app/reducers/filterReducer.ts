import { UPDATE_CATEGORY, UPDATE_PRICE } from "~/actions/filterActions";

export function filterReducer(state, action) {
  const newState = {
    ...state,
    pageParams: {
      ...state.pageParams,
      ...action.pageParams,
    },
    apiResponse: action.response,
  };

  switch (action.type) {
    case UPDATE_CATEGORY: {
      return newState;
    }
    case UPDATE_PRICE: {
      return newState;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
