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

// types
export type ActionsTypeForAuth = ReturnType<typeof setIsLoggedInAC>