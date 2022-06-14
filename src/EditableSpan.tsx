import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('EDITABLE SPAN');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.value);
    }, [props.value]);
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.onChange(title);
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
        : <p className={'taskTitle'} onDoubleClick={activateEditMode}>{props.value} </p>;
});
