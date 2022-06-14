import { AccountTypes } from "../constants/account";
import api from "../../config/axios";

export const getAccounts = () => async (dispatch) => {
  let url = `/user/accounts`;
  console.log("get all")
  await dispatch({
    type: AccountTypes.GET_ACCOUNTS,
    payload: await api.get(url),
  });
};

export const addAccount = (request) => async (dispatch) => {
  let url = `/user/account`;
  await dispatch({
    type: AccountTypes.ADD_ACCOUNT,
    payload: await api.post(url, request),
  });
  await dispatch(getAccounts())
};

export const updateAccount = (request) => async (dispatch) => {
  let url = `/user/account`;
  await dispatch({
    type: AccountTypes.UPDATE_ACCOUNT,
    payload: await api.put(url, request),
  });
  await dispatch(getAccounts())
};

export const deleteAccount = (request) => async (dispatch) => {
  let url = `/user/account/${request.id}`;
  await dispatch({
    type: AccountTypes.DELETE_ACCOUNT,
    payload: await api.delete(url),
  });
  await dispatch(getAccounts())
};

