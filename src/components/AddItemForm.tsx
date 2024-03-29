import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void,
    disabled?: boolean,
    label: string
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addItem = useCallback(() => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }, [props, title]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItem();
        }
    };

    return (
        <div className="input_block">
            <TextField
                variant={'outlined'}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                label={props.label}
                helperText={error}
                style={{backgroundColor: 'AppWorkspace', width: '360px', borderRadius: 5}}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} disabled={props.disabled}>
                <AddIcon className="addBtn"/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;