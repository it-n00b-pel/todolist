import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './store/store';
import {ErrorSnackbar} from './components/ErrorSnackbar';
import AppLoader from './components/AppLoader';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './components/Login/Login';
import ToDoLISTS from './components/ToDoLISTS';
import CircularProgress from '@mui/material/CircularProgress';
import {initializeApp} from './store/reducers/saga/appSaga';

function App() {
    const dispatch = useAppDispatch();

    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const error = useAppSelector(state => state.app.error);
    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>;
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
        </div>

    );
}

export default App;
