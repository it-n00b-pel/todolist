import {SetPreloaderStatusAC} from './appReducer';
import {authApi, LoginParamsType} from '../../api/ToDoListAPI';
import {handleServerAppError, handleServerNetworkError} from '../../utils-error/error-utils';
import {AppThunk} from '../store';
import {ACTION_TYPE} from '../ENUM/ENUM';

const initialState = {
    isLoggedIn: false
};
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypeForAuth): InitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: ACTION_TYPE.SET_IS_LOGGED_IN, value} as const);

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(SetPreloaderStatusAC('loading'));
    authApi.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(SetPreloaderStatusAC('succeeded'));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        });
};

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(SetPreloaderStatusAC('loading'));
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false));
                dispatch(SetPreloaderStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

// types
export type ActionsTypeForAuth = ReturnType<typeof setIsLoggedInAC>