import { SET_OTHER_USER_STOCKS, LOADING_OTHER_USER_STOCKS } from "../types";

const initialState = {
  stocks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_OTHER_USER_STOCKS:
      return {
        loading: false,
        ...action.payload,
      };
    case LOADING_OTHER_USER_STOCKS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
