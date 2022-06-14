import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from './components/AddItemForm';
import {useAppDispatch, useAppSelector} from './store/store';
import ToDoList from './components/ToDoList';
import {Grid, Paper} from '@mui/material';
import {addNewToDoListTC, fetchToDoListsTC} from './store/reducers/toDoListReducer';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from './components/ErrorSnackbar';

function App() {
    console.log('APP');
    let toDoLists = useAppSelector(state => state.toDoLists);
    const isLoading = useAppSelector(state => state.app.status);
    const error = useAppSelector(state => state.app.error)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchToDoListsTC());
    }, [dispatch]);

    const addNewToDoList = useCallback((title: string) => {
        dispatch(addNewToDoListTC(title));
    }, [dispatch]);

    return (
        <div>
            <div className={'LinearProgress'}>
                {isLoading === 'loading' && <LinearProgress color="inherit"/>}
            </div>
            <div className="App">
                {error && <ErrorSnackbar error={error}/>}
                <AddItemForm addItem={addNewToDoList}/>
                <Grid container spacing={3}>
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
        </div>

    );
}

export default App;
