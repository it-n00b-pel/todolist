import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addNewToDoListTC, fetchToDoListsTC} from '../store/reducers/toDoListReducer';
import AddItemForm from './AddItemForm';
import {Grid, Paper} from '@mui/material';
import ToDoList from './ToDoList';
import {Navigate} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {Logout} from '@mui/icons-material';
import {logoutTC} from '../store/reducers/auth-reducer';

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
            <div style={{display:'flex'}}>
                <div>
                    {isLoggedIn
                        && <IconButton className="" size="medium" color="secondary" style={{height: '50px', width:"50px"}}>
                            <Logout onClick={() => (dispatch(logoutTC()))}/>
                        </IconButton>}
                </div>
                <div className="main_input"><AddItemForm addItem={addNewToDoList}/></div>
            </div>
            <div className="todoLISTS" >
                {toDoLists.map((t) => {
                    return <Grid className="TodoItem" item key={t.id}>
                        <Paper className={'todoPaper'} elevation={8} style={{boxShadow:"5px 5px 5px 6px grey"}}>
                            <ToDoList toDoList={t} key={t.id} toDoListID={t.id}/>
                        </Paper>
                    </Grid>;
                })}
            </div>

        </div>
    );
};

export default ToDoLists;
