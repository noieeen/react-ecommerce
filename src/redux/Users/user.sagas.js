import { takeLatest, call, all, put } from "redux-saga/effects";
import { handleUserProfile, auth, GoogleProvider } from "../../firebase/utils";
import userTypes from "./user.types";

import { signInSuccess } from "./user.actions";

export function* getSnapshotFromAuthUser(user) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromAuthUser(user);
  } catch (err) {
    //   console.log(err);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export default function* usrSagas() {
  yield all([call(onEmailSignInStart)]);
}
