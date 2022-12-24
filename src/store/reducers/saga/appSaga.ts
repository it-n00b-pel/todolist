import {AxiosError, AxiosResponse} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import {authApi, LoginParamsType, ResponseType} from '../../../api/ToDoListAPI';
import {setIsLoggedInAC} from '../auth-reducer';
import {handleServerNetworkError} from './error-utilsSaga';
import {setIsInitializedAC} from '../appReducer';

export const initializeApp = () => ({type: 'APP-INITIALIZE'});

export function* initializeAppWorker() {
    try {
        const response: AxiosResponse<ResponseType<{ data: LoginParamsType }>> = yield call(authApi.me);
        if (response.data.resultCode === 0) {
            yield put(setIsLoggedInAC(true));
        } else {
            // yield put(handleServerAppError(response.data));
        }
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError));
    } finally {
        yield put(setIsInitializedAC(true));
    }
}

export function* initializeAppWatcher() {
    yield  takeEvery('APP-INITIALIZE', initializeAppWorker);
}

export type ActionTypeAppSaga = ReturnType<typeof initializeApp>

