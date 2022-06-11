import {
    AddNewToDoListAT,
    ChangeFilterToDoListAT,
    ChangeTitleToDoListAT,
    FilterType,
    RemoveToDoListAT,
    SetToDoListsAT
} from "../actions/ActionsForToDoList";
import {ACTION_TYPE} from "../ENUM/ENUM";
import {ToDoListType} from "../../api/ToDoListAPI";

export const AddNewToDoList = (toDoList: ToDoListType): AddNewToDoListAT => {
    return {
        type: ACTION_TYPE.ADD_NEW_TODOLIST,
        toDoList
    }
}
export const RemoveToDoList = (toDoListID: string): RemoveToDoListAT => {
    return {
        type: ACTION_TYPE.REMOVE_TODOLIST,
        toDoListID,
    }
}
export const ChangeToDoListTitle = (toDoListID: string, title: string): ChangeTitleToDoListAT => {
    return {
        type: ACTION_TYPE.CHANGE_TITLE_TODOLIST,
        toDoListID,
        title,
    }
}
export const ChangeToDoListFilter = (toDoListID: string, filter: FilterType): ChangeFilterToDoListAT => {
    return {
        type: ACTION_TYPE.CHANGE_FILTER_TODOLIST,
        toDoListID,
        filter,
    }
}

export const SetToDoLists = (toDoLists: ToDoListType[]): SetToDoListsAT => {
  return {
      type: ACTION_TYPE.SET_TODOLISTS,
      toDoLists
  }
}