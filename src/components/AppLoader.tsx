import React from 'react';
import {useAppSelector} from '../store/store';
import LinearProgress from '@mui/material/LinearProgress';

const AppLoader = () => {
    const isLoading = useAppSelector(state => state.app.status);
    return (
        <div className={'LinearProgress'}>
        {isLoading === 'loading' && <LinearProgress color="inherit"/>}
    </div>
    );
};

export default AppLoader;

