import { StatisticTypes } from "../constants/statistic";
import api from "../../config/axios";

export const getStatistics = () => async (dispatch) => {
  let url = `/report/statistics`;
  await dispatch({
    type: StatisticTypes.GET_STATISTICS,
    payload: await api.get(url),
  });
};