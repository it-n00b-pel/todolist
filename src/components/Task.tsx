import React, {ChangeEvent, memo, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {useAppDispatch} from '../store/store';
import {TaskStatus} from '../store/ENUM/ENUM';
import CircularProgress from '@mui/material/CircularProgress';
import {DomainTaskType} from '../store/initialState/initialState';
import {ChangeTaskStatus, ChangeTaskTitle, DeleteTask} from '../store/reducers/saga/taskSaga';

export type TaskPropsType = {
    ToDoListID: string
    task: DomainTaskType
}

const Task = memo((props: TaskPropsType) => {
    console.log('TASK');
    const dispatch = useAppDispatch();

    const changeTitleTask = useCallback((title: string) => {
        dispatch(ChangeTaskTitle(props.ToDoListID, props.task.id, title));
    }, [dispatch, props.ToDoListID, props.task.id]);
    const deleteTask = useCallback(() => {
        dispatch(DeleteTask(props.ToDoListID, props.task.id));
    }, [dispatch, props.ToDoListID, props.task.id]);
    const changeStatusTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked;
        dispatch(ChangeTaskStatus(props.ToDoListID, props.task.id, newTaskStatus ? TaskStatus.Completed : TaskStatus.New));
    }, [dispatch, props.ToDoListID, props.task.id]);
    return (

        <div className={'task'}>
            {props.task.entityStatus === 'loading' ?
                <CircularProgress style={{margin: '3px'}} color="inherit" size={18}/>
                :
                <Checkbox
                    checked={props.task.status === TaskStatus.Completed}
                    color="primary"
                    onChange={changeStatusTask}
                />
            }
            <EditableSpan value={props.task.title} onChange={changeTitleTask} taskStatus={props.task.status}/>
            <IconButton onClick={deleteTask} disabled={props.task.entityStatus === 'loading'} style={{padding: 0}}>
                <Delete/>
            </IconButton>
        </div>

    );
});

export default Task;