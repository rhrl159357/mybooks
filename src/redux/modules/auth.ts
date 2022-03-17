import { push } from "connected-react-router";
import { stat } from "fs";
import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { AuthState, LoginReqType } from "../../types";

// 인증을 관리하는 파일

const initialState: AuthState = {
    token:null,
    loading:false,
    error:null,
}

const prefix = "my-books/auth"

export const {pending, success, fail} = createActions("PENDING", "SUCCESS", "FAIL", {prefix})

const reducer = handleActions<AuthState, string>({
    PENDING: (state) =>({
        ...state,
        loading:true,
        error:null,
    }),

    SUCCESS:(state, action) => ({
        token: action.payload,
        loading:false,
        error:null,
    }),

    FAIL:(state, action : any) => ({
        ...state,
        loading:false,
        error:action.payload,
    }),


}, initialState,{prefix});

export default reducer

export const {login, logout} = createActions('LOGIN', 'LOGOUT',{prefix})

function* loginSaga(action : Action<LoginReqType>) {
    try {
        yield put(pending());
        const token: string = yield call(UserService.login, action.payload);
        TokenService.set(token)
        yield put(success(token))
        yield put(push("/"))
    } catch (e) {
        yield put(fail(new Error("unknown error")))
    }
}
function* logoutSaga() {
    try {
        yield put(pending());
        const token: string = yield select((state) => state.auth.token)
        yield call(UserService.logout, token)
        TokenService.set(token)
        
        yield put(push("/"))
    } catch (e) {

    }finally{
        TokenService.remove()
        yield put(success(null))
    }
}

//saga

export function* authSaga() {
    yield takeEvery(`${prefix}/LOGIN`, loginSaga)
    yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
}