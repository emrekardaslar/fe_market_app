import { UPDATE_CATEGORY } from "~/actions/filterActions";

export function filterReducer(state, action) {
  switch (action.type) {
    case UPDATE_CATEGORY: {
      return {
        ...state,
        pageParams: { ...state.pageParams, ...action.pageParams },
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
