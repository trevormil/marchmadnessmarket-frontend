import { SET_SCORES, LOADING_SCORES } from "../types";

const initialState = {
  scores: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCORES:
      return {
        loading: false,
        ...action.payload,
      };
    case LOADING_SCORES:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
