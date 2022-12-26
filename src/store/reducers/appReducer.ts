import {ACTION_TYPE} from '../ENUM/ENUM';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
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
        case ACTION_TYPE.SET_APP_INITIALIZED: {
            return {...state, isInitialized: action.isInitialized};
        }
        default:
            return state;
    }
};

// actions

export const setPreloaderStatusAC = (status: RequestStatusType) => {
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
export const setIsInitializedAC = (isInitialized: boolean) => ({
    type: ACTION_TYPE.SET_APP_INITIALIZED,
    isInitialized,
} as const);

// types

export type ActionTypesForAppPreloader =
    | ReturnType<typeof setPreloaderStatusAC>
    | ReturnType<typeof SetAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>

