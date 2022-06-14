import {FilterType} from "../actions/ActionsForToDoList";
import {TaskType, ToDoListType} from "../../api/ToDoListAPI";
import {RequestStatusType} from '../reducers/appPreloaderReducer';

export type ToDoListStateType = ToDoListType & {
    filter: FilterType,
}

export type TaskStateType = {
    [key: string]: DomainTaskType[],
}

export type DomainTaskType = TaskType & {
    entityStatus: RequestStatusType
}

//          ---         INITIAL STATE FOR TODOLIST           ---
export const initialStateToDoLists: ToDoListStateType[] = [
    // {
    //     "id": "3426eaf7-3b03-4e91-bc40-ec188bcadacc",
    //     "title": "gf",
    //     "addedDate": "2022-06-09T19:34:17.91",
    //     "order": -9,
    //     filter: "all"
    // },
    // {
    //     "id": "063214e7-b827-45df-9af4-788a808c13e4",
    //     "title": "23",
    //     "addedDate": "2022-06-09T18:49:00.84",
    //     "order": -7,
    //     filter: "all"
    // }
]

//          ---         INITIAL STATE FOR TASK           ---
export const initialStateTask: TaskStateType = {
    // ["8856fa6c-1ef2-4662-bfb1-afceabc84dc1"]: [
    //     {addedDate: "2022-06-09T19:34:19.223",
    //         deadline: null,
    //         description: null,
    //         id: "c6bce840-594f-4ca3-bcbb-4be90f21d88d",
    //         order: -4,
    //         priority: 1,
    //         startDate: null,
    //         status: 0,
    //         title: "111df",
    //         todoListId: "063214e7-b827-45df-9af4-788a808c13e4"},
    //     {addedDate: "2022-06-09T19:34:19.223",
    //         deadline: null,
    //         description: null,
    //         id: "c6bce840-594f-4ca3-bcbb-4be90f2s1d88d",
    //         order: -4,
    //         priority: 1,
    //         startDate: null,
    //         status: 0,
    //         title: "111df",
    //         todoListId: "063214e7-b827-45df-9af4-788a808dc13e4"}
    // ],
    // ["063214e7-b827-45df-9af4-788a808c13e4"]: [
    //     {addedDate: "2022-06-09T19:34:19.223",
    //         deadline: null,
    //         description: null,
    //         id: "c6bce840-594f-4ca3-bcbb-4bed90f21d88d",
    //         order: -4,
    //         priority: 1,
    //         startDate: null,
    //         status: 0,
    //         title: "222df",
    //         todoListId: "063214e7-b827-45df-9af4-788a808c13e4"},
    //     {addedDate: "2022-06-09T19:34:19.223",
    //         deadline: null,
    //         description: null,
    //         id: "c6bce840-594f-4ca3-bcbb-4be90f21d88d",
    //         order: -4,
    //         priority: 1,
    //         startDate: null,
    //         status: 0,
    //         title: "222df",
    //         todoListId: "063214e7-b827-45df-9af4-788a808c13e4"}
    // ],
}