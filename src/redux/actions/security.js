import { SecurityTypes } from "../constants/security";
import api from "../../config/axios";

export const getUser = (request) => async (dispatch) => {
  let url = `/user/me`;
  localStorage.setItem("TOKEN", JSON.stringify(request))
  await dispatch({
    type: SecurityTypes.GET_USER,
    payload: await api.get(url),
  });
};

export const logout = () => () => {
  localStorage.removeItem("TOKEN")
};