import { takeLatest, call, all, put } from "redux-saga/effects";
import { handleUserProfile, auth, getCurrentUser, GoogleProvider } from "../../firebase/utils";
import userTypes from "./user.types";

import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from "./user.actions";
import { hanndleResetPasswordAPI } from "./user.helper";

export function* getSnapshotFromAuthUser(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
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

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromAuthUser(userAuth);
  } catch (err) {
    // console.log(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess())


  } catch (error) {
    // console.log(error);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({ payload: { displayName, email, password, confirmPassword } }) {


  if (password !== confirmPassword) {
    const err = ["Password don't match."];
    yield put(userError(err));
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName }
    yield getSnapshotFromAuthUser(user, additionalData)
    // yield call(handleUserProfile,{userAuth:user,additionalData: { displayName }});

  } catch (err) {
    console.log('handelSubmit >', err);
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email } }) {

  try {
    yield call(hanndleResetPasswordAPI, email)
    yield put(resetPasswordSuccess())
  } catch (err) {
    yield put(userError(err))
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider)
    yield getSnapshotFromAuthUser(user);

  } catch (err) {
    // console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
  yield all([call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutUserStart), call(onSignUpUserStart), call(onResetPasswordStart), call(onGoogleSignInStart)]);
}
