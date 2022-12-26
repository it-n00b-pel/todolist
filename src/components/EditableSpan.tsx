import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';

import {TaskStatus} from '../store/ENUM/ENUM';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    taskStatus?: TaskStatus
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.value);
    }, [props.value]);
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.value !== title && props.onChange(title);
    }, [title, props]);
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }, []);
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            activateViewMode();
        }
    }, [activateViewMode]);

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}
                     onKeyPress={onKeyPressHandler}/>
        : <p className={props.taskStatus === TaskStatus.Completed ? 'taskComplete taskTitle' : 'taskTitle'} onDoubleClick={activateEditMode}>{props.value}  </p>;
});