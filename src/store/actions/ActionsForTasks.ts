import {ACTION_TYPE} from "../ENUM/ENUM";
import {TaskStatus, TaskType} from "../../api/ToDoListAPI";

export type AddNewTaskAT = {
    type: ACTION_TYPE.ADD_NEW_TASK,
    task: TaskType,
}
export type RemoveTaskAT = {
    type: ACTION_TYPE.REMOVE_TASK,
    toDoListID: string,
    taskID: string,
}
export type ChangeTaskTitleAT = {
    type: ACTION_TYPE.CHANGE_TASK_TITLE,
    toDoListID: string,
    taskID: string,
    title: string,
}
export type ChangeTaskStatusAT = {
    type: ACTION_TYPE.CHANGE_TASK_STATUS,
    toDoListID: string,
    taskID: string,
    status: TaskStatus,
}

export type SetTasksAT = {
    type: ACTION_TYPE.SET_TASKS,
    toDoListID: string,
    tasks: Array<TaskType>
}


