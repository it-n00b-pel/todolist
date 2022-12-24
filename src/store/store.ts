import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ActionTypesForToDoLists, toDoListReducer} from './reducers/toDoListReducer';
import {ActionTypesForTasks, tasksReducer} from './reducers/tasksReducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ActionTypesForAppPreloader, appReducer} from './reducers/appReducer';
import {ActionsTypeForAuth, authReducer} from './reducers/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import {all} from '@redux-saga/core/effects';
import {errorWatcher} from './reducers/saga/error-utilsSaga';
import {ActionTypeAuthSaga, authWatcher} from './reducers/saga/authSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    toDoLists: toDoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

function* rootWatcher() {
    yield all([errorWatcher(), authWatcher()]);
}

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(rootWatcher);
type AppActionsType = ActionTypesForToDoLists | ActionTypesForTasks | ActionTypesForAppPreloader | ActionsTypeForAuth | ActionTypeAuthSaga

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;