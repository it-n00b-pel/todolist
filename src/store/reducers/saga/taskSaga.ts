import {call, put, takeEvery, select} from 'redux-saga/effects';

import {AxiosError, AxiosResponse} from 'axios';

import {AddNewTask, ChangeStatusTask, ChangeTitleTask, RemoveTask, SetEntityTaskStatus, SetTasks} from '../actionCreators/actionCreatorsForTasks';
import {GetTaskResponse, ResponseType, TaskType, toDoListAPI} from '../../../api/ToDoListAPI';
import {setPreloaderStatusAC} from '../appReducer';
import {SetEntityStatusToDoList} from '../actionCreators/actionCreatorsForToDoList';
import {AppRootStateType} from '../../store';
import {TaskStateType} from '../../initialState/initialState';
import {TaskStatus} from '../../ENUM/ENUM';

import {handleServerAppError, handleServerNetworkError} from './error-utilsSaga';

export const FetchTasks = (toDoListID: string) => ({type: 'TASKS-FETCH_TASKS', toDoListID});

export function* fetchTasksWorker(action: ReturnType<typeof FetchTasks>) {
    try {
        yield put(setPreloaderStatusAC('loading'));
        const response: AxiosResponse<GetTaskResponse> = yield call(toDoListAPI.getTasks, action.toDoListID);
        const tasks = response.data.items;
        yield put(SetTasks(action.toDoListID, tasks));
        yield put(setPreloaderStatusAC('succeeded'));
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError));
    }
}

export const AddNewTasks = (toDoListID: string, title: string) => ({type: 'TASKS-ADD_NEW_TASK', toDoListID, title});

export function* AddNewTaskWorker(action: ReturnType<typeof AddNewTasks>) {
    try {
        yield put(SetEntityStatusToDoList(action.toDoListID, 'loading'));
        yield put(setPreloaderStatusAC('loading'));
        const response: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(toDoListAPI.addNewTask, action.toDoListID, action.title);
        if (response.data.resultCode === 0) {
            const newTask = response.data.data.item;
            yield put(AddNewTask(newTask));
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

export const DeleteTask = (toDoListID: string, taskID: string) => ({type: 'TASKS-DELETE_TASK', toDoListID, taskID});

export function* deleteTaskWorker(action: ReturnType<typeof DeleteTask>) {
    try {
        yield put(setPreloaderStatusAC('loading'));
        yield put(SetEntityTaskStatus(action.toDoListID, action.taskID, 'loading'));
        const response: AxiosResponse<ResponseType> = yield call(toDoListAPI.deleteTask, action.toDoListID, action.taskID);
        if (response.data.resultCode === 0) {
            yield put(RemoveTask(action.toDoListID, action.taskID));
            yield put(setPreloaderStatusAC('succeeded'));
            yield put(SetEntityTaskStatus(action.toDoListID, action.taskID, 'succeeded'));
        } else {
            yield put(handleServerAppError(response.data));
            yield put(SetEntityStatusToDoList(action.toDoListID, 'failed'));
        }
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError, action.toDoListID));
    }
}

export const ChangeTaskTitle = (toDoListID: string, taskID: string, title: string) => ({type: 'TASKS-CHANGE_TASK_TITLE', toDoListID, taskID, title});

export function* changeTaskTitleWorker(action: ReturnType<typeof ChangeTaskTitle>) {
    const allTasks: TaskStateType = yield  select((state: AppRootStateType) => state.tasks);
    const tasksForCurrentToDoList = allTasks[action.toDoListID];
    const task: TaskType | undefined = tasksForCurrentToDoList.find(t => t.id === action.taskID);
    try {
        if (task) {
            yield put(setPreloaderStatusAC('loading'));
            const response: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(toDoListAPI.updateTask, action.toDoListID, action.taskID, {...task, title: action.title});
            if (response.data.resultCode === 0) {
                yield put(ChangeTitleTask(action.toDoListID, action.taskID, action.title));
                yield put(setPreloaderStatusAC('succeeded'));
            } else {
                yield put(handleServerAppError(response.data));
                yield put(SetEntityTaskStatus(action.toDoListID, action.taskID, 'failed'));
            }
        }
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError, action.toDoListID, action.taskID));
    }
}

export const ChangeTaskStatus = (toDoListID: string, taskID: string, status: TaskStatus) => ({type: 'TASKS-CHANGE_TASK_STATUS', toDoListID, taskID, status});

export function* changeTaskStatusWorker(action: ReturnType<typeof ChangeTaskStatus>) {
    const allTasks: TaskStateType = yield  select((state: AppRootStateType) => state.tasks);
    const tasksForCurrentToDoList = allTasks[action.toDoListID];
    const task: TaskType | undefined = tasksForCurrentToDoList.find(t => t.id === action.taskID);
    try {
        if (task) {
            yield put(setPreloaderStatusAC('loading'));
            yield put(SetEntityTaskStatus(action.toDoListID, action.taskID, 'loading'));
            const response: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(toDoListAPI.updateTask, action.toDoListID, action.taskID, {...task, status: action.status});
            if (response.data.resultCode === 0) {
                yield put(ChangeStatusTask(action.toDoListID, action.taskID, action.status));
                yield put(setPreloaderStatusAC('succeeded'));
                yield put(SetEntityTaskStatus(action.toDoListID, action.taskID, 'succeeded'));
            } else {
                handleServerAppError(response.data);
                yield put(SetEntityTaskStatus(action.toDoListID, action.taskID, 'failed'));
            }
        }
    } catch (err) {
        yield put(handleServerNetworkError(err as AxiosError, action.toDoListID, action.taskID));
    }
}

export function* tasksWatcher() {
    yield takeEvery('TASKS-FETCH_TASKS', fetchTasksWorker);
    yield takeEvery('TASKS-ADD_NEW_TASK', AddNewTaskWorker);
    yield takeEvery('TASKS-DELETE_TASK', deleteTaskWorker);
    yield takeEvery('TASKS-CHANGE_TASK_TITLE', changeTaskTitleWorker);
    yield takeEvery('TASKS-CHANGE_TASK_STATUS', changeTaskStatusWorker);
}