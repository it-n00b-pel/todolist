import {initialStateToDoLists, ToDoListStateType} from '../initialState/initialState';
import {AddNewToDoListAT, ChangeFilterToDoListAT, ChangeTitleToDoListAT, RemoveToDoListAT, SetEntityStatusToDoListAT, SetToDoListsAT} from './actions/ActionsForToDoList';
import {ACTION_TYPE} from '../ENUM/ENUM';

export type ActionTypesForToDoLists =
    AddNewToDoListAT
    | RemoveToDoListAT
    | ChangeTitleToDoListAT
    | ChangeFilterToDoListAT
    | SetToDoListsAT
    | SetEntityStatusToDoListAT

export const toDoListReducer = (state = initialStateToDoLists, action: ActionTypesForToDoLists): ToDoListStateType[] => {
    switch (action.type) {
        case ACTION_TYPE.ADD_NEW_TODOLIST:
            return [{...action.toDoList, filter: 'all', entityStatus: 'idle'}, ...state];
        case ACTION_TYPE.REMOVE_TODOLIST:
            return state.filter(toDoList => toDoList.id !== action.toDoListID);
        case ACTION_TYPE.CHANGE_TITLE_TODOLIST:
            return [...state].map(toDoList => toDoList.id === action.toDoListID ? {
                ...toDoList,
                title: action.title,
            } : toDoList);
        case ACTION_TYPE.CHANGE_FILTER_TODOLIST:
            return [...state].map(toDoList => toDoList.id === action.toDoListID ? {
                ...toDoList,
                filter: action.filter,
            } : toDoList);
        case ACTION_TYPE.SET_TODOLISTS: {
            return action.toDoLists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}));
        }
        case ACTION_TYPE.SET_ENTITY_STATUS_TODOLIST: {
            return [...state].map(t => t.id === action.toDoListID ? {...t, entityStatus: action.entityStatus} : t);
        }
        default :
            return state;
    }
};
