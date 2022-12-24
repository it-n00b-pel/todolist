import {DomainTaskType, initialStateTask, TaskStateType} from '../initialState/initialState';
import {
    AddNewTaskAT,
    ChangeTaskStatusAT,
    ChangeTaskTitleAT,
    RemoveTaskAT,
    SetEntityTaskStatusAT,
    SetTasksAT
} from './actions/ActionsForTasks';
import {ACTION_TYPE, TaskStatus} from '../ENUM/ENUM';
import {AppThunk} from '../store';
import {TaskType, toDoListAPI} from '../../api/ToDoListAPI';
import {
    AddNewTask,
    ChangeStatusTask,
    ChangeTitleTask,
    RemoveTask,
    SetEntityTaskStatus,
    SetTasks
} from './actionCreators/actionCreatorsForTasks';
import {AddNewToDoListAT, RemoveToDoListAT} from './actions/ActionsForToDoList';
import {setPreloaderStatusAC} from './appReducer';
import {SetEntityStatusToDoList} from './actionCreators/actionCreatorsForToDoList';
import {handleServerAppError, handleServerNetworkError} from './saga/error-utilsSaga';


export type ActionTypesForTasks =
    AddNewTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | SetTasksAT
    | AddNewToDoListAT
    | RemoveToDoListAT
    | SetEntityTaskStatusAT

export const tasksReducer = (state = initialStateTask, action: ActionTypesForTasks): TaskStateType => {
    switch (action.type) {
        case ACTION_TYPE.ADD_NEW_TASK:
            const newTask: DomainTaskType = {...action.task, entityStatus: 'idle'};
            return {
                ...state, [action.task.todoListId]: [newTask, ...state[action.task.todoListId]]
            };
        case ACTION_TYPE.REMOVE_TASK:
            return {...state, [action.toDoListID]: state[action.toDoListID].filter(task => task.id !== action.taskID)};
        case ACTION_TYPE.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.title
                } : task)
            };
        case ACTION_TYPE.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    status: action.status
                } : task)
            };
        case ACTION_TYPE.SET_TASKS: {
            return {
                ...state, [action.toDoListID]: action.tasks.map(t => {
                    return {...t, entityStatus: 'idle'};
                })
            };
        }
        case ACTION_TYPE.ADD_NEW_TODOLIST: {
            return {...state, [action.toDoList.id]: []};
        }
        case ACTION_TYPE.REMOVE_TODOLIST: {
            const copyState = {...state};
            delete copyState[action.toDoListID];
            return copyState;
        }
        case ACTION_TYPE.SET_ENTITY_STATUS_TASK: {
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    entityStatus: action.entityStatus
                } : t)
            };
        }
        default:
            return state;
    }
};

//          ---         THUNK FOR TASKS           ---

export const fetchTasks = (toDoListID: string): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatusAC('loading'));
    toDoListAPI.getTasks(toDoListID)
        .then(res => {
            const tasks = res.data.items;
            dispatch(SetTasks(toDoListID, tasks));
            dispatch(setPreloaderStatusAC('succeeded'));
        })
        .catch(error => {
            handleServerNetworkError(error);
        });
};
export const AddNewTaskTC = (toDoListID: string, title: string): AppThunk => (dispatch) => {
    dispatch(SetEntityStatusToDoList(toDoListID, 'loading'));
    dispatch(setPreloaderStatusAC('loading'));
    toDoListAPI.addNewTask(toDoListID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const newTask = res.data.data.item;
                dispatch(AddNewTask(newTask));
                dispatch(setPreloaderStatusAC('succeeded'));
                dispatch(SetEntityStatusToDoList(toDoListID, 'succeeded'));
            } else {
                handleServerAppError(res.data);
                dispatch(SetEntityStatusToDoList(toDoListID, 'failed'));
            }
        })
        .catch(error => {
            handleServerNetworkError(error,  toDoListID);
        });
};

export const DeleteTaskTC = (toDoListID: string, taskID: string): AppThunk => (dispatch) => {
    dispatch(setPreloaderStatusAC('loading'));
    dispatch(SetEntityTaskStatus(toDoListID, taskID, 'loading'));
    toDoListAPI.deleteTask(toDoListID, taskID)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(RemoveTask(toDoListID, taskID));
                dispatch(setPreloaderStatusAC('succeeded'));
                dispatch(SetEntityTaskStatus(toDoListID, taskID, 'succeeded'));
            } else {
                handleServerAppError(res.data);
                dispatch(SetEntityTaskStatus(toDoListID, taskID, 'failed'));
            }
        })
        .catch(error => {
            handleServerNetworkError(error,  toDoListID, taskID);
        });

};
export const ChangeTaskTitleTC = (toDoListID: string, taskID: string, title: string): AppThunk => (dispatch, getState) => {
    const allTasks = getState().tasks;
    const tasksForCurrentToDoList = allTasks[toDoListID];
    const task: TaskType | undefined = tasksForCurrentToDoList.find(t => t.id === taskID);

    if (task) {
        dispatch(setPreloaderStatusAC('loading'));
        toDoListAPI.updateTask(toDoListID, taskID, {
            ...task, title: title
        }).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(ChangeTitleTask(toDoListID, taskID, title));
                dispatch(setPreloaderStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data);
                dispatch(SetEntityTaskStatus(toDoListID, taskID, 'failed'));
            }
        })
            .catch(error => {
                handleServerNetworkError(error,  toDoListID, taskID);
            });
    }
};

export const ChangeTaskStatusTC = (toDoListID: string, taskID: string, status: TaskStatus): AppThunk => (dispatch, getState) => {
    const allTasks = getState().tasks;
    const tasksForCurrentToDoList = allTasks[toDoListID];
    const task: TaskType | undefined = tasksForCurrentToDoList.find(t => t.id === taskID);

    if (task) {
        dispatch(setPreloaderStatusAC('loading'));
        dispatch(SetEntityTaskStatus(toDoListID, taskID, 'loading'));
        toDoListAPI.updateTask(toDoListID, taskID, {
            ...task, status: status
        })
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(ChangeStatusTask(toDoListID, taskID, status));
                    dispatch(setPreloaderStatusAC('succeeded'));
                    dispatch(SetEntityTaskStatus(toDoListID, taskID, 'succeeded'));
                } else {
                    handleServerAppError(res.data);
                    dispatch(SetEntityTaskStatus(toDoListID, taskID, 'failed'));
                }
            })
            .catch(error => {
                handleServerNetworkError(error,  toDoListID, taskID);
            });
    }
};