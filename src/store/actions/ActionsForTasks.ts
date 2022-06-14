import {ACTION_TYPE, TaskStatus} from '../ENUM/ENUM';
import {TaskType} from '../../api/ToDoListAPI';
import {RequestStatusType} from '../reducers/appReducer';

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
export type SetEntityTaskStatusAT = {
    type: ACTION_TYPE.SET_ENTITY_STATUS_TASK,
    entityStatus: RequestStatusType,
    toDoListID: string,
    taskID: string,
}


