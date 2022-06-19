import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addNewToDoListTC, fetchToDoListsTC} from '../store/reducers/toDoListReducer';
import AddItemForm from './AddItemForm';
import {Grid, Paper} from '@mui/material';
import ToDoList from './ToDoList';
import {Navigate} from 'react-router-dom';

const ToDoLists = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    let toDoLists = useAppSelector(state => state.toDoLists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchToDoListsTC());
    }, [dispatch,isLoggedIn]);

    const addNewToDoList = useCallback((title: string) => {
        dispatch(addNewToDoListTC(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }
    return (
        <div className="App">
            <div className="main_input"><AddItemForm addItem={addNewToDoList}/></div>

            <Grid className={'todoLISTS'}   container spacing={3}>
                    {toDoLists.map((t) => {
                        return <Grid item key={t.id}>
                            <Paper className={'todoPaper'} elevation={8}
                                   style={{padding: '10px', backgroundColor: 'InfoBackground'}
                                   }>
                                <ToDoList toDoList={t} key={t.id} toDoListID={t.id}/>
                            </Paper>
                        </Grid>;
                    })}
                </Grid>
        </div>
    );
};

export default ToDoLists;
