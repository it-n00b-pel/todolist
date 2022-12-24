import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addNewToDoListTC, fetchToDoListsTC} from '../store/reducers/toDoListReducer';
import AddItemForm from './AddItemForm';
import {Grid, Paper} from '@mui/material';
import ToDoList from './ToDoList';
import {Navigate} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {Logout} from '@mui/icons-material';
import Draggable from 'react-draggable';
import {logOut} from '../store/reducers/saga/authSaga';

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
            <div className={'rightBlock'}>
                {isLoggedIn && <IconButton color="secondary">
                    <Logout onClick={() => (dispatch(logOut()))}/>
                </IconButton>}
                <div className="main_input"><AddItemForm addItem={addNewToDoList} label={'ToDoList'}/></div>
            </div>
            <div className="todoLISTS">
                {toDoLists.map((t) => {
                    return <Draggable handle="strong" bounds={'parent'} key={t.id}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Grid className="TodoItem" item key={t.id}>

                                <Paper className={'todoPaper'} elevation={8} style={{boxShadow: '5px 5px 5px 6px #01340AC7'}}>
                                    <ToDoList toDoList={t} key={t.id} toDoListID={t.id}/>
                                </Paper>

                            </Grid>
                        </div>
                    </Draggable>;

                })}
            </div>

        </div>
    );
};

export default ToDoLists;
