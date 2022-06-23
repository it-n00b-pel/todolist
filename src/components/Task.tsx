import React, {ChangeEvent, memo, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {ChangeTaskStatusTC, ChangeTaskTitleTC, DeleteTaskTC} from '../store/reducers/tasksReducer';
import {useAppDispatch} from '../store/store';
import {TaskStatus} from '../store/ENUM/ENUM';
import CircularProgress from '@mui/material/CircularProgress';
import {DomainTaskType} from '../store/initialState/initialState';

export type TaskPropsType = {
    ToDoListID: string
    task: DomainTaskType
}

const Task = memo((props: TaskPropsType) => {
    console.log('TASK');
    const dispatch = useAppDispatch();

    const changeTitleTask = useCallback((title: string) => {
        dispatch(ChangeTaskTitleTC(props.ToDoListID, props.task.id, title));
    }, [dispatch, props.ToDoListID, props.task.id]);
    const deleteTask = useCallback(() => {
        dispatch(DeleteTaskTC(props.ToDoListID, props.task.id));
    }, [dispatch, props.ToDoListID, props.task.id]);
    const changeStatusTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked;
        dispatch(ChangeTaskStatusTC(props.ToDoListID, props.task.id, newTaskStatus ? TaskStatus.Completed : TaskStatus.New));
    }, [dispatch, props.ToDoListID, props.task.id]);
    return (
        <div style={{display: 'flex', fontSize: '22px', fontWeight: '600', alignItems: 'center'}}>
            {props.task.entityStatus === 'loading' ?
                <CircularProgress style={{margin: '3px'}} color="inherit" size={18}/>
                :
                <Checkbox
                    checked={props.task.status === TaskStatus.Completed}
                    color="primary"
                    onChange={changeStatusTask}
                />
            }
            <EditableSpan value={props.task.title} onChange={changeTitleTask}/>
            <IconButton onClick={deleteTask} disabled={props.task.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;