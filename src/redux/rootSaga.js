import { all, call } from "redux-saga/effects";

import userSagas from "./Users/user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas)]);
}
