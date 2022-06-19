import {ACTION_TYPE} from '../ENUM/ENUM';
import {authApi} from '../../api/ToDoListAPI';
import {setIsLoggedInAC} from '../../components/Login/auth-reducer';
import {AppThunk} from '../store';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
};

type AppInitialStateType = typeof initialState

export const appReducer = (state: AppInitialStateType = initialState, action: ActionTypesForAppPreloader): AppInitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_PRELOADER_STATUS: {
            return {...state, status: action.status};
        }
        case ACTION_TYPE.SET_APP_ERROR: {
            return {...state, error: action.error};
        }
        case 'APP/SET-Initialized': {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state;
    }
};

export const SetPreloaderStatusAC = (status: RequestStatusType) => {
    return {
        type: ACTION_TYPE.SET_PRELOADER_STATUS,
        status,
    } as const;
};

export const SetAppErrorAC = (error: string | null) => {
    return {
        type: ACTION_TYPE.SET_APP_ERROR,
        error,
    } as const;
};
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-Initialized', isInitialized} as const);

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setIsInitializedAC(true));
        } else {
        }
    })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        });
};

export type ActionTypesForAppPreloader =
    ReturnType<typeof SetPreloaderStatusAC>
    | ReturnType<typeof SetAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>

