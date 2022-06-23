import axios, {AxiosResponse} from 'axios';
import {TaskStatus} from '../store/ENUM/ENUM';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8fad767d-9189-48dd-8e32-2ec4faaa594d'
    }
});
// const config = {
//     onUploadProgress: progressEvent => console.log(progressEvent.loaded)
// }
export const toDoListAPI = {
    getToDoLists() {
        return instance.get<ToDoListType[]>('todo-lists',);
    },
    deleteToDoList(toDoListID: string) {
        return instance.delete<AxiosResponse<ResponseType>>(`todo-lists/${toDoListID}`);
    },
    addNewToDoList(title: string) {
        return instance.post<ResponseType<{ item: ToDoListType }>>(`todo-lists`, {title});
    },
    updateToDoList(toDoListID: string, title: string) {
        return instance.put<ResponseType<{ item: ToDoListType }>>(`todo-lists/${toDoListID}`, {title});
    },
    getTasks(toDoListID: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${toDoListID}/tasks`);
    },
    addNewTask(toDoListID: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${toDoListID}/tasks`, {title});
    },
    deleteTask(toDoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${toDoListID}/tasks/${taskID}`);
    },
    updateTask(toDoListID: string, taskID: string, task: TaskType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${toDoListID}/tasks/${taskID}/`, task);
    }

};

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', data);
    },
    me() {
        return instance.get<ResponseType<{ data: LoginParamsType }>>(`/auth/me`);
    },
    logout(){
        return instance.delete<ResponseType>(`/auth/login`)
    }
};

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    message?: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type GetTaskResponse = {
    items: TaskType[],
    totalCount: number
    error: null
}
export type ToDoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
}

export type TaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: TaskStatus
    title: string
    todoListId: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

