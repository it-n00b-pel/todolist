import {ResponseType} from '../api/ToDoListAPI';
import {SetAppErrorAC, SetPreloaderStatusAC} from '../store/reducers/appReducer';
import {AppDispatch} from '../store/store';
import {SetEntityStatusToDoList} from '../store/actionCreators/actionCreatorsForToDoList';
import {SetEntityTaskStatus} from '../store/actionCreators/actionCreatorsForTasks';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {

    if (data.message?.length) {
        dispatch(SetAppErrorAC(data.message.toString()));
    }
    if (data.messages.length) {
        dispatch(SetAppErrorAC(data.messages[0]));
    } else {
        dispatch(SetAppErrorAC('Some error occurred'));
    }


    dispatch(SetPreloaderStatusAC('failed'));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch, toDoListID = '', taskID = '') => {
    dispatch(SetAppErrorAC(error.message));
    toDoListID !== '' && taskID === '' && dispatch(SetEntityStatusToDoList(toDoListID, 'failed'));
    toDoListID !== '' && taskID !== '' && dispatch(SetEntityTaskStatus(toDoListID, taskID, 'failed'));
    dispatch(SetPreloaderStatusAC('failed'));
};

