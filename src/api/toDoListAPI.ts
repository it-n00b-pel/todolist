import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "8fad767d-9189-48dd-8e32-2ec4faaa594d"
    }
})

export const toDoListAPI = {
    getToDoLists() {
        return instance.get<ToDoListType[]>("todo-lists");
    },
    deleteToDoList(toDoListID: string) {
        return instance.delete(`todo-lists/${toDoListID}`)
    },
    addNewToDoList(title: string) {
        return instance.post(`todo-lists`, {title})
    }
}

export type ToDoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
}