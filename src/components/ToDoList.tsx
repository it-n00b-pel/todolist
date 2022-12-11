import React, {memo, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {ToDoListStateType} from '../store/initialState/initialState';
import {ChangeToDoListFilter} from '../store/actionCreators/actionCreatorsForToDoList';
import {EditableSpan} from './EditableSpan';
import AddItemForm from './AddItemForm';
import {FilterType} from '../store/actions/ActionsForToDoList';
import s from '../ToDoListStyle.module.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {deleteToDoListTC, updateToDoListTC} from '../store/reducers/toDoListReducer';
import {AddNewTaskTC, fetchTasks} from '../store/reducers/tasksReducer';
import {TaskStatus} from '../store/ENUM/ENUM';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DraggableTasksList from './DraggableTasksList';

export type ToDoListPropsType = {
    toDoListID: string
    toDoList: ToDoListStateType
}

export const ToDoList = memo(({toDoListID, toDoList}: ToDoListPropsType) => {
    console.log('TODOLIST');
    const dispatch = useAppDispatch();

    let tasksFromStore = useAppSelector(state => state.tasks[toDoListID]);

    useEffect(() => {
        dispatch(fetchTasks(toDoListID));
    }, [toDoListID, dispatch]);
    const filterTasks = (filter: FilterType) => {
        switch (filter) {
            case 'active':
                return tasksFromStore.filter(t => t.status === TaskStatus.New);
            case 'completed':
                return tasksFromStore.filter(t => t.status === TaskStatus.Completed);
            default :
                return tasksFromStore;
        }
    };

    const tasks = filterTasks(toDoList.filter);

    const changeFilterTypeToAll = useCallback(() => {
        dispatch(ChangeToDoListFilter(toDoListID, 'all'));
    }, [toDoListID, dispatch]);
    const changeFilterTypeToCompleted = useCallback(() => {
        dispatch(ChangeToDoListFilter(toDoListID, 'completed'));
    }, [toDoListID, dispatch]);
    const changeFilterTypeToActive = useCallback(() => {
        dispatch(ChangeToDoListFilter(toDoListID, 'active'));
    }, [toDoListID, dispatch]);

    const addTask = useCallback((title: string) => {
        dispatch(AddNewTaskTC(toDoListID, title));
    }, [toDoListID, dispatch]);

    const removeToDoList = useCallback(() => {
        dispatch(deleteToDoListTC(toDoListID));
    }, [toDoListID, dispatch]);

    const changeToDoListTitle = useCallback((title: string) => {
        dispatch(updateToDoListTC(toDoListID, title));
    }, [toDoListID, dispatch]);



    return (
        <div>
            <strong>
                <h2 className={s.toDoListTitle}>
                    <EditableSpan value={toDoList.title}
                                  onChange={changeToDoListTitle}/>

                    <IconButton onClick={removeToDoList} disabled={toDoList.entityStatus === 'loading'}>
                        <DeleteOutlineIcon className={s.deleteIcon}/>
                    </IconButton>
                </h2>
            </strong>


            <div className={s.toDoListAddForm}>
                <AddItemForm
                    addItem={addTask}
                    disabled={toDoList.entityStatus === 'loading'}
                    label={'Task'}
                />
            </div>
            <div className={'tasks'}>
                <DraggableTasksList tasks={tasks} toDoListID={toDoListID}/>
            </div>


            <ButtonGroup className="buttons" variant="contained">
                <Button className={toDoList.filter === 'all' ? 'act' : ''} style={{width: '33%'}} color={'info'} onClick={changeFilterTypeToAll}>All</Button>
                <Button className={toDoList.filter === 'completed' ? 'act' : ''} style={{width: '33%'}} color={'success'}
                        onClick={changeFilterTypeToCompleted}>Completed</Button>
                <Button className={toDoList.filter === 'active' ? 'act' : ''} style={{width: '33%'}} color={'error'} onClick={changeFilterTypeToActive}>Active</Button>
            </ButtonGroup>
        </div>
    );
});

export default ToDoList;