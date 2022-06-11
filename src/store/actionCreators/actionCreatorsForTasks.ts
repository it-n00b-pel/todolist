import {
    AddNewTaskAT,
    ChangeTaskStatusAT,
    ChangeTaskTitleAT,
    RemoveTaskAT,
    SetTasksAT
} from "../actions/ActionsForTasks";
import {ACTION_TYPE} from "../ENUM/ENUM";
import {TaskType} from "../../api/ToDoListAPI";

export const AddNewTask = (toDoListID: string, title: string): AddNewTaskAT => {
    return {
        type: ACTION_TYPE.ADD_NEW_TASK,
        toDoListID,
        title
    }
}
export const RemoveTask = (toDoListID: string, taskID: string): RemoveTaskAT => {
    return {
        type: ACTION_TYPE.REMOVE_TASK,
        toDoListID,
        taskID
    }
}
export const ChangeTitleTask = (toDoListID: string, taskID: string, title: string): ChangeTaskTitleAT => {
    return {
        type: ACTION_TYPE.CHANGE_TASK_TITLE,
        toDoListID,
        taskID,
        title
    }
}
export const ChangeStatusTask = (toDoListID: string, taskID: string, isDone: boolean): ChangeTaskStatusAT => {
    return {
        type: ACTION_TYPE.CHANGE_TASK_STATUS,
        toDoListID,
        taskID,
        isDone
    }
}

export const SetTasks = (toDoListID: string, tasks: Array<TaskType>): SetTasksAT => {
    return {
        type: ACTION_TYPE.SET_TASKS,
        toDoListID,
        tasks,
    }
}