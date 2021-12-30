import { createAction, handleActions } from "redux-actions";
import produce from 'immer'
import { takeLatest, call } from "@redux-saga/core/effects";
import createRequestSaga ,{ createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const LOGOUT = 'auth/LOGOUT';

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // register, login
        key, // UserId, UserPass, UserPassConfirm
        value, // 바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login

export const register = createAction(REGISTER, ({ UserId, UserPass, UserName }) => ({
    UserId, 
    UserPass,
    UserName
}));

export const login = createAction(LOGIN, ({ UserId, UserPass }) => ({
    UserId,
    UserPass,
}));

export const logout = createAction(LOGOUT);

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* logoutSaga() {
    try {
        console.log('로그아웃 로그아웃');
        sessionStorage.removeItem('auth');
        yield call(authAPI.logout);        
    } catch (e) {
        console.log(e);
    }
};

export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    register: {
        UserId: '',
        UserPass: '',
        UserPassConfirm: '',
        UserName: '',        
    },
    login: {
        UserId: '',
        UserPass: '',        
    },
    auth: null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value; // 예:state.register.username을 바꾼다.
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
            authError: null, // 폼 전환시 회원 인증 에러 초기화
        }),
        // 회원가입 성공
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
        }),
        // 회원가입 실패
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        //로그인 성공
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        //로그인 실패
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        //로그아웃
        [LOGOUT]: state => ({
            ...state,
            auth: null,
        })
    },
    initialState,
);

export default auth;