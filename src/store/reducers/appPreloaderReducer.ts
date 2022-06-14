import {ACTION_TYPE} from '../ENUM/ENUM';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
};

type InitialStateType = typeof initialState

export const appPreloaderReducer = (state: InitialStateType = initialState, action: ActionTypesForAppPreloader): InitialStateType => {
    switch (action.type) {
        case ACTION_TYPE.SET_PRELOADER_STATUS: {
            return {...state, status: action.status};
        }
        default:
            return state;
    }
};

type SetPreloaderStatusAT = {
    type: ACTION_TYPE.SET_PRELOADER_STATUS,
    status: RequestStatusType,
}
export const SetPreloaderStatusAC = (status: RequestStatusType): SetPreloaderStatusAT => {
    return {
        type: ACTION_TYPE.SET_PRELOADER_STATUS,
        status
    } as const;
};

export type ActionTypesForAppPreloader = ReturnType<typeof SetPreloaderStatusAC>

