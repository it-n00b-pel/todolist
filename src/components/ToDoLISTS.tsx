import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addNewToDoListTC, fetchToDoListsTC} from '../store/reducers/toDoListReducer';
import AddItemForm from './AddItemForm';
import {Grid, Paper} from '@mui/material';
import ToDoList from './ToDoList';
import {Navigate} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {Logout} from '@mui/icons-material';
import {logoutTC} from './Login/auth-reducer';

const ToDoLists = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    let toDoLists = useAppSelector(state => state.toDoLists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchToDoListsTC());
    }, [dispatch, isLoggedIn]);

    const addNewToDoList = useCallback((title: string) => {
        dispatch(addNewToDoListTC(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }
    return (
        <div className="App">

            <div className="main_input"><AddItemForm addItem={addNewToDoList}/></div>

            <Grid className="todoLISTS" container spacing={3}>
                {toDoLists.map((t) => {
                    return <Grid className="TodoItem" item key={t.id}>
                        <Paper className={'todoPaper'} elevation={8}
                               style={{padding: '10px'}
                               }>
                            <ToDoList toDoList={t} key={t.id} toDoListID={t.id}/>
                        </Paper>
                    </Grid>;
                })}
            </Grid>
            {isLoggedIn
                && <IconButton className="" size="medium" color="secondary" style={{height: '50px'}}>
                    <Logout onClick={() => (dispatch(logoutTC()))}/>
                </IconButton>}


        </div>
    );
};

export default ToDoLists;
