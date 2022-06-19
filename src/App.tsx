import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/store';
import {ErrorSnackbar} from './components/ErrorSnackbar';
import AppLoader from './components/AppLoader';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './components/Login/Login';
import ToDoLISTS from './components/ToDoLISTS';
import {initializeAppTC} from './store/reducers/appReducer';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
    console.log('APP');
    const dispatch = useAppDispatch();
    // let toDoLists = useAppSelector(state => state.toDoLists);
    // const isLoading = useAppSelector(state => state.app.status);
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const error = useAppSelector(state => state.app.error);
    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);
    // const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     dispatch(fetchToDoListsTC());
    // }, [dispatch]);

    // const addNewToDoList = useCallback((title: string) => {
    //     dispatch(addNewToDoListTC(title));
    // }, [dispatch]);
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <AppLoader/>
            {error && <ErrorSnackbar error={error}/>}
            <Routes>
                <Route path="/" element={<ToDoLISTS/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="/404" element={<h1>404</h1>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>


            {/*<div className="App">*/}

            {/*<AddItemForm addItem={addNewToDoList}/>*/}
            {/*<Grid container spacing={3}>*/}
            {/*    {toDoLists.map((t) => {*/}
            {/*        return <Grid item key={t.id}>*/}
            {/*            <Paper className={'todoPaper'} elevation={8}*/}
            {/*                   style={{padding: '10px', backgroundColor: 'InfoBackground'}*/}
            {/*                   }>*/}
            {/*                <ToDoList toDoList={t} key={t.id} toDoListID={t.id}/>*/}
            {/*            </Paper>*/}
            {/*        </Grid>;*/}
            {/*    })}*/}
            {/*</Grid>*/}
            {/*<ToDoLISTS/>*/}

            {/*</div>*/}

        </div>

    );
}

export default App;
