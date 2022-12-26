import React, {useCallback, useEffect} from 'react';

import {Grid, Paper} from '@mui/material';

import {Navigate} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {Logout} from '@mui/icons-material';

import {useAppDispatch, useAppSelector} from '../store/store';
import {logOut} from '../store/reducers/saga/authSaga';
import {addNewToDoLists, fetchToDoLists} from '../store/reducers/saga/toDoListSaga';

import ToDoList from './ToDoList';
import AddItemForm from './AddItemForm';

const ToDoLists = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    let toDoLists = useAppSelector(state => state.toDoLists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchToDoLists());
    }, [dispatch, isLoggedIn]);

    const addNewToDoList = useCallback((title: string) => {
        dispatch(addNewToDoLists(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="App">

            <div className={'rightBlock'}>
                {isLoggedIn && <IconButton color="secondary" onClick={() => (dispatch(logOut()))}>
                    <Logout/>
                </IconButton>}
                <div className="main_input"><AddItemForm addItem={addNewToDoList} label={'ToDoList'}/></div>
            </div>

            <div className="todoLISTS">
                {toDoLists.map((t) => {
                    return <div key={t.id}>
                        <Grid item key={t.id}>
                            <Paper className={'todoPaper'} elevation={8} style={{boxShadow: '5px 5px 5px 6px #000'}}>
                                <ToDoList toDoList={t} key={t.id} toDoListID={t.id}/>
                            </Paper>
                        </Grid>
                    </div>;
                })}
            </div>

        </div>
    );
};

export default ToDoLists;
