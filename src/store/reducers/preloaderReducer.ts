import {ACTION_TYPE} from '../ENUM/ENUM';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
};

type InitialStateType = typeof initialState

export const preloaderReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TYPE.SET_PRELOADER_STATUS: {
            return {...state};
        }
        default:
            return state;
    }
};