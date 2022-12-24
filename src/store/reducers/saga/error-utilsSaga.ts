import {ResponseType} from '../../../api/ToDoListAPI';
import {put, takeEvery} from 'redux-saga/effects';
import {SetAppErrorAC, setPreloaderStatusAC} from '../appReducer';
import {SetEntityStatusToDoList} from '../actionCreators/actionCreatorsForToDoList';
import {SetEntityTaskStatus} from '../actionCreators/actionCreatorsForTasks';
import {AxiosError} from 'axios';

export const handleServerAppError = <T>(data: ResponseType<T>) => ({type: 'ERROR-APP_ERROR', data});

export function* handleServerAppErrorWorker(action: ReturnType<typeof handleServerAppError>) {
    if (action.data.message?.length) {
        yield put(SetAppErrorAC(action.data.message.toString()));
        yield put(SetAppErrorAC(action.data.message.toString()));
    }
    if (action.data.messages.length) {
        yield put(SetAppErrorAC(action.data.messages[0]));
    } else {
        yield put(SetAppErrorAC('Some error occurred'));
    }
    yield put(setPreloaderStatusAC('failed'));
}

export const handleServerNetworkError = (e: AxiosError, toDoListID = '', taskID = '') => ({type: 'ERROR-NETWORK_ERROR', e, toDoListID, taskID});

export function* handleServerNetworkErrorWorker(action: ReturnType<typeof handleServerNetworkError>) {
    const error = action.e.response?.data ? (action.e.response?.data as ({ message: string })).message : action.e.message + ', more details in the console';
    yield put(SetAppErrorAC(error));
    if (action.toDoListID !== '' && action.taskID === '') yield put(SetEntityStatusToDoList(action.toDoListID, 'failed'));
    if (action.toDoListID !== '' && action.taskID !== '') yield put(SetEntityTaskStatus(action.toDoListID, action.taskID, 'failed'));
    yield put(setPreloaderStatusAC('failed'));
}

export function* errorWatcher() {
    yield takeEvery('ERROR-APP_ERROR', handleServerAppErrorWorker);
    yield takeEvery('ERROR-NETWORK_ERROR', handleServerNetworkErrorWorker);
}