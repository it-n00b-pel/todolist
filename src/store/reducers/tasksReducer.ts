import {initialStateTask, TaskStateType} from "../initialState/initialState";
import {AddNewTaskAT, ChangeTaskStatusAT, ChangeTaskTitleAT, RemoveTaskAT} from "../actions/ActionsForTasks";
import {ACTION_TYPE} from "../ENUM/ENUM";
import {v1} from "uuid";

export type ActionTypesForTasks =
    AddNewTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    // | AddNewToDoListAT
    // | RemoveToDoListAT

export const tasksReducer = (state = initialStateTask, action: ActionTypesForTasks): TaskStateType => {
    switch (action.type) {
        case ACTION_TYPE.ADD_NEW_TASK:
            return {
                ...state,
                [action.toDoListID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.toDoListID]]
            }
        case ACTION_TYPE.REMOVE_TASK:
            return {...state, [action.toDoListID]: state[action.toDoListID].filter(task => task.id !== action.taskID)}
        case ACTION_TYPE.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.title
                } : task)
            }
        case ACTION_TYPE.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.toDoListID]: state[action.toDoListID].map(task => task.id === action.taskID ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }
        // case ACTION_TYPE.ADD_NEW_TODOLIST:
        //     return {...state, [action.toDoList.id]: []}
        // case ACTION_TYPE.REMOVE_TODOLIST:
        //     let newState = {...state}
        //     delete newState[action.toDoListID]
        //     return newState
        default:
            return state
    }
}