import { INIT_DATA } from "./action.types";

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
