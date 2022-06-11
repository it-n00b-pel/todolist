import {FilterType} from "../actions/ActionsForToDoList";
import {ToDoListType} from "../../api/toDoListAPI";

export type ToDoListStateType = ToDoListType & {
    filter: FilterType,
}

export type TaskStateType = {
    [key: string]: TaskType[],
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
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
    // [todolistId1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: "Milk", isDone: true},
    //     {id: v1(), title: "React Book", isDone: true}
    // ]
}