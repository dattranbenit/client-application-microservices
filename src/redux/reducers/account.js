import { AccountTypes } from "../constants/account";

const initialState = {
  accounts: []
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case AccountTypes.GET_ACCOUNTS: {
      return {
        ...state,
        accounts: action.payload.data
      }
    }
    case AccountTypes.ADD_ACCOUNT:
    case AccountTypes.UPDATE_ACCOUNT:
    case AccountTypes.DELETE_ACCOUNT:{
      return {
        ...state,
      }
    }
  }
  return state;
}
