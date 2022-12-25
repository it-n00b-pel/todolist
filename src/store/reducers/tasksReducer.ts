import {DomainTaskType, initialStateTask, TaskStateType} from '../initialState/initialState';
import {AddNewTaskAT, ChangeTaskStatusAT, ChangeTaskTitleAT, RemoveTaskAT, SetEntityTaskStatusAT, SetTasksAT} from './actions/ActionsForTasks';
import {ACTION_TYPE} from '../ENUM/ENUM';
import {AddNewToDoListAT, RemoveToDoListAT} from './actions/ActionsForToDoList';

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
                ...state, [action.task.todoListId]: [newTask, ...state[action.task.todoListId]],
            };
        case ACTION_TYPE.REMOVE_TASK:
            return {...state, [action.toDoListID]: state[action.toDoListID].filter(task => task.id !== action.taskID)};
        case ACTION_TYPE.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.title,
                } : task),
            };
        case ACTION_TYPE.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    status: action.status,
                } : task),
            };
        case ACTION_TYPE.SET_TASKS: {
            return {
                ...state, [action.toDoListID]: action.tasks.map(t => {
                    return {...t, entityStatus: 'idle'};
                }),
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
                    entityStatus: action.entityStatus,
                } : t),
            };
        }
        default:
            return state;
    }
};