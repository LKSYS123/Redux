import { createAction, handleActions } from "redux-actions";
import { takeLatest, call } from "@redux-saga/core/effects";
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리

// 회원정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK, UserId => UserId);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);


function checkFailureSaga() {
    try {
        sessionStorage.removeItem('user');
    } catch (e) {
        console.log('sessionStorage is not working');
    }
};

export function* logoutSaga() {
    try {
        yield call(authAPI.logout);
        sessionStorage.removeItem('auth');
    } catch (e) {
        console.log(e);
    }
};

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
};

const initialState = {
    user: null,
    checkError: null
};

export default handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({
            ...state,
            user
        }),
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            user: null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        })
    },
    initialState,
)