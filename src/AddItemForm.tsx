import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('ADD ITEM FORMa');
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
                label="Task"
                helperText={error}

            />
            <IconButton className="addBtn" onClick={addItem}>
                <AddIcon style={{backgroundColor: '#2164f1', color: '#FFFFFF'}}/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;