import { SecurityTypes } from "../constants/security";

const initialState = {
  user: {}
};

export const securityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SecurityTypes.GET_USER: {
      return {
        ...state,
        user: action.payload.data
      }
    }
    case SecurityTypes.LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
  }
  return state;
}
