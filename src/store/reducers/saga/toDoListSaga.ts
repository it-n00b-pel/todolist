import {call, put, takeEvery} from 'redux-saga/effects';
import {setPreloaderStatusAC} from '../appReducer';
import {AxiosError, AxiosResponse} from 'axios';
import {ResponseType, toDoListAPI, ToDoListType} from '../../../api/ToDoListAPI';
import {AddNewToDoList, ChangeToDoListTitle, RemoveToDoList, SetEntityStatusToDoList, SetToDoLists} from '../actionCreators/actionCreatorsForToDoList';
import {handleServerAppError, handleServerNetworkError} from './error-utilsSaga';

export const fetchToDoLists = () => ({type: 'TODO-FETCH_TODOLISTS'});

export function* fetchToDoListsWorker() {
    try {
        yield put(setPreloaderStatusAC('loading'));
        const response: AxiosResponse<ToDoListType[]> = yield call(toDoListAPI.getToDoLists);
        yield put(SetToDoLists(response.data));
        yield put(setPreloaderStatusAC('succeeded'));
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError));
    }
}

export const addNewToDoLists = (title: string) => ({type: 'TODO-ADD_NEW_TODOLIST', title});

export function* addNewToDoListsWorker(action: ReturnType<typeof addNewToDoLists>) {
    try {
        yield put(setPreloaderStatusAC('loading'));
        const response: AxiosResponse<ResponseType<{ item: ToDoListType }>> = yield call(toDoListAPI.addNewToDoList, action.title);
        if (response.data.resultCode === 0) {
            yield put(AddNewToDoList(response.data.data.item));
            yield put(setPreloaderStatusAC('succeeded'));
        } else {
            yield put(handleServerAppError(response.data));
        }
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError));
    }
}

export const DeleteToDoList = (toDoListID: string) => ({type: 'TODO-DELETE_TODOLIST', toDoListID});

export function* deleteToDoListWorker(action: ReturnType<typeof DeleteToDoList>) {
    try {
        yield put(setPreloaderStatusAC('loading'));
        yield put(SetEntityStatusToDoList(action.toDoListID, 'loading'));
        const response: AxiosResponse<ResponseType> = yield call(toDoListAPI.deleteToDoList, action.toDoListID);
        if (response.data.resultCode === 0) {
            yield put(RemoveToDoList(action.toDoListID));
            yield put(setPreloaderStatusAC('succeeded'));
            yield put(SetEntityStatusToDoList(action.toDoListID, 'succeeded'));
        } else {
            yield put(handleServerAppError(response.data));
            yield put(SetEntityStatusToDoList(action.toDoListID, 'failed'));
        }
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError, action.toDoListID));
    }
}

export const UpdateToDoList = (toDoListID: string, title: string) => ({type: 'TODO-UPDATE_TODOLISTs_TITLE', toDoListID, title});

export function* updateToDoListsWorker(action: ReturnType<typeof UpdateToDoList>) {
    try {
        yield put(setPreloaderStatusAC('loading'));
        yield put(SetEntityStatusToDoList(action.toDoListID, 'loading'));
        const response: AxiosResponse<ResponseType<{ item: ToDoListType }>> = yield call(toDoListAPI.updateToDoList, action.toDoListID, action.title);
        if (response.data.resultCode === 0) {
            yield put(ChangeToDoListTitle(action.toDoListID, action.title));
            yield put(setPreloaderStatusAC('succeeded'));
            yield put(SetEntityStatusToDoList(action.toDoListID, 'succeeded'));
        } else {
            yield put(handleServerAppError(response.data));
            yield put(SetEntityStatusToDoList(action.toDoListID, 'failed'));
        }
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError, action.toDoListID));
    }
}

export function* toDoListsWatcher() {
    yield takeEvery('TODO-FETCH_TODOLISTS', fetchToDoListsWorker);
    yield takeEvery('TODO-ADD_NEW_TODOLIST', addNewToDoListsWorker);
    yield takeEvery('TODO-DELETE_TODOLIST', deleteToDoListWorker);
    yield takeEvery('TODO-UPDATE_TODOLISTs_TITLE', updateToDoListsWorker);
}