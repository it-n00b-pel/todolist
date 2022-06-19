import {SetPreloaderStatusAC} from '../../store/reducers/appReducer';
import {authApi, LoginParamsType} from '../../api/ToDoListAPI';
import {handleServerAppError, handleServerNetworkError} from '../../utils-error/error-utils';
import {AppThunk} from '../../store/store';

const initialState = {
    isLoggedIn: false
};
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypeForAuth): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const);

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
    dispatch(SetPreloaderStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(SetPreloaderStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
export type ActionsTypeForAuth = ReturnType<typeof setIsLoggedInAC>