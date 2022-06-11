import {ACTION_TYPE} from "../ENUM/ENUM";
import {ToDoListType} from "../../api/ToDoListAPI";

export type FilterType = "all" | "completed" | "active"

export type AddNewToDoListAT = {
    type: ACTION_TYPE.ADD_NEW_TODOLIST,
    toDoList: ToDoListType,
}
export type RemoveToDoListAT = {
    type: ACTION_TYPE.REMOVE_TODOLIST,
    toDoListID: string,
}
export type ChangeTitleToDoListAT = {
    type: ACTION_TYPE.CHANGE_TITLE_TODOLIST,
    toDoListID: string,
    title: string,
}
export type ChangeFilterToDoListAT = {
    type: ACTION_TYPE.CHANGE_FILTER_TODOLIST,
    toDoListID: string,
    filter: FilterType,
}

export type SetToDoListsAT = {
    type: ACTION_TYPE.SET_TODOLISTS,
    toDoLists: ToDoListType[],
}