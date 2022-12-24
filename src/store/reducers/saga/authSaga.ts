import {put, call, takeEvery} from 'redux-saga/effects';

import {authApi, LoginParamsType, ResponseType} from '../../../api/ToDoListAPI';
import {setPreloaderStatusAC} from '../appReducer';
import {AxiosError, AxiosResponse} from 'axios';
import {setIsLoggedInAC} from '../auth-reducer';
import {handleServerAppError, handleServerNetworkError} from './error-utilsSaga';

export const login = (data: LoginParamsType) => ({type: 'AUTH-LOGIN', data});

export function* loginWorker(action: ReturnType<typeof login>) {
    try {
        yield put(setPreloaderStatusAC('loading'));
        const loginData: AxiosResponse<ResponseType<{ userId: number }>> = yield call(authApi.login, action.data);
        if (loginData.data.resultCode === 0) {
            yield  put(setIsLoggedInAC(true));
            yield  put(setPreloaderStatusAC('succeeded'));
        } else {
            yield  put(handleServerAppError(loginData.data));
        }
    } catch (err) {
        yield  put(handleServerNetworkError(err as AxiosError));
    }
}

export const logOut = () => ({type: 'AUTH-LOGOUT'});

export function* logOutWorker() {
    try {
        yield put(setPreloaderStatusAC('loading'));
        const logout: AxiosResponse<ResponseType> = yield call(authApi.logout);
        if (logout.data.resultCode === 0) {
            yield put(setIsLoggedInAC(false));
            yield put(setPreloaderStatusAC('succeeded'));
        } else {
            yield  put(handleServerAppError(logout.data));
        }
    } catch (err) {
        yield  put(handleServerNetworkError(err as AxiosError));
    }
}

export function* authWatcher() {
    yield takeEvery('AUTH-LOGIN', loginWorker);
    yield takeEvery('AUTH-LOGOUT', logOutWorker);
}

export type ActionTypeAuthSaga = ReturnType<typeof login> | ReturnType<typeof logOut>
