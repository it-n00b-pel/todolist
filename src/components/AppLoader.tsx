import React from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import {useAppSelector} from '../store/store';

const AppLoader = () => {
    const isLoading = useAppSelector(state => state.app.status);
    return (
        <div className={'LinearProgress'}>
        {isLoading === 'loading' && <LinearProgress color="inherit"/>}
    </div>
    );
};

export default AppLoader;

