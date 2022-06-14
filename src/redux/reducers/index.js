import { combineReducers } from 'redux';
import { accountReducer } from "./account";
import { securityReducer } from "./security";
import {statisticReducer} from "./statistic";

export const rootReducer = combineReducers({
  account: accountReducer,
  security: securityReducer,
  statistic: statisticReducer
});
