import { StatisticTypes } from "../constants/statistic";

const initialState = {
  statistics: []
};

export const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case StatisticTypes.GET_STATISTICS: {
      return {
        ...state,
        statistics: action.payload.data
      }
    }
  }
  return state;
}
