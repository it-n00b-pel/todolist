import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {ChangeStatusTask} from "./store/actionCreators/actionCreatorsForTasks";
import {ChangeTaskTitleTC, DeleteTaskTC} from "./store/reducers/tasksReducer";
import {useAppDispatch} from "./store/store";

export type TaskPropsType = {
    ToDoListID: string
    taskID: string,
    title: string
    isDone?: boolean,
}

const Task = memo((props: TaskPropsType) => {
    console.log("TASK")
    const dispatch = useAppDispatch();

    const changeTitleTask = useCallback((title: string) => {
        dispatch(ChangeTaskTitleTC(props.ToDoListID, props.taskID, title))
    }, [dispatch, props.ToDoListID, props.taskID])
    const deleteTask = useCallback(() => {
        dispatch(DeleteTaskTC(props.ToDoListID, props.taskID))
    }, [dispatch, props.ToDoListID, props.taskID])
    const changeStatusTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeStatusTask(props.ToDoListID, props.taskID, e.currentTarget.checked))
    }, [dispatch, props.ToDoListID, props.taskID])
    return (
        <div style={{display: "flex"}}>
            <Checkbox
                checked={props.isDone}
                color="primary"
                onChange={changeStatusTask}
            />
            <EditableSpan value={props.title} onChange={changeTitleTask}/>
            <IconButton onClick={deleteTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})

export default Task;