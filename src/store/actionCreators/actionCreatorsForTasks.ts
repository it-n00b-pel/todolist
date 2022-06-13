import {
    AddNewTaskAT,
    ChangeTaskStatusAT,
    ChangeTaskTitleAT,
    RemoveTaskAT,
    SetTasksAT
} from "../actions/ActionsForTasks";
import {ACTION_TYPE} from "../ENUM/ENUM";
import {TaskStatus, TaskType} from "../../api/ToDoListAPI";

export const AddNewTask = (task: TaskType): AddNewTaskAT => {
    return {
        type: ACTION_TYPE.ADD_NEW_TASK,
        task,
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
export const ChangeStatusTask = (toDoListID: string, taskID: string, status: TaskStatus): ChangeTaskStatusAT => {
    return {
        type: ACTION_TYPE.CHANGE_TASK_STATUS,
        toDoListID,
        taskID,
        status
    }
}

export const SetTasks = (toDoListID: string, tasks: Array<TaskType>): SetTasksAT => {
    return {
        type: ACTION_TYPE.SET_TASKS,
        toDoListID,
        tasks,
    }
}