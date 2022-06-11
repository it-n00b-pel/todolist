import {initialStateToDoLists, ToDoListStateType} from "../initialState/initialState";
import {
    AddNewToDoListAT,
    ChangeFilterToDoListAT,
    ChangeTitleToDoListAT,
    RemoveToDoListAT,
    SetToDoListsAT
} from "../actions/ActionsForToDoList";
import {ACTION_TYPE} from "../ENUM/ENUM";
import {toDoListAPI} from "../../api/toDoListAPI";
import {
    AddNewToDoList,
    ChangeToDoListTitle,
    RemoveToDoList,
    SetToDoLists
} from "../actionCreators/actionCreatorsForToDoList";
import {AppThunk} from "../store";

export type ActionTypesForToDoLists =
    AddNewToDoListAT
    | RemoveToDoListAT
    | ChangeTitleToDoListAT
    | ChangeFilterToDoListAT
    | SetToDoListsAT

export const toDoListReducer = (state = initialStateToDoLists, action: ActionTypesForToDoLists): ToDoListStateType[] => {
    switch (action.type) {
        case ACTION_TYPE.ADD_NEW_TODOLIST:
            return [...state, {...action.toDoList, filter: "all"}]
        case ACTION_TYPE.REMOVE_TODOLIST:
            return state.filter(toDoList => toDoList.id !== action.toDoListID)
        case ACTION_TYPE.CHANGE_TITLE_TODOLIST:
            return [...state].map(toDoList => toDoList.id === action.toDoListID ? {
                ...toDoList,
                title: action.title
            } : toDoList)
        case ACTION_TYPE.CHANGE_FILTER_TODOLIST:
            return [...state].map(toDoList => toDoList.id === action.toDoListID ? {
                ...toDoList,
                filter: action.filter
            } : toDoList)
        case ACTION_TYPE.SET_TODOLISTS: {
            return action.toDoLists.map(t => ({...t, filter: "all"}))
        }
        // const todolist = state.find(tl => tl.toDoListID === action.toDoListID);
        // if (todolist) {
        //     // если нашёлся - изменим ему заголовок
        //     todolist.filter = action.filter;
        // }
        // return [...state]
        default :
            return state
    }
}

//          ---         THUNK FOR TODOLIST           ---

export const fetchToDoListsTC = (): AppThunk => {
    return (dispatch) => {
        toDoListAPI.getToDoLists()
            .then((res) => {
                dispatch(SetToDoLists(res.data))
            })

    }
}
export const addNewToDoListTC = (title: string): AppThunk => (dispatch) => {
    toDoListAPI.addNewToDoList(title).then(res => {
        dispatch(AddNewToDoList(res.data.data.item))
    })
}

export const deleteToDoListTC = (toDoListID: string): AppThunk => (dispatch) => {
    toDoListAPI.deleteToDoList(toDoListID).then(res => {
        dispatch(RemoveToDoList(toDoListID))
    })
}

export const updateToDoList = (toDoListID: string, title: string): AppThunk => (dispatch) => {
    toDoListAPI.updateToDoList(toDoListID, title).then(res => {
        dispatch(ChangeToDoListTitle(toDoListID, title))
    })
}