import React, {useEffect} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import ListItem from '@material-ui/core/ListItem';
import Task from './Task';
import {DomainTaskType} from '../store/initialState/initialState';
import {makeStyles} from '@material-ui/core';

type DraggableTasksListPropsType = {
    tasks: DomainTaskType[]
    toDoListID: string
}

const DraggableTasksList = ({tasks, toDoListID}: DraggableTasksListPropsType) => {
    const [items, setItems] = React.useState(tasks);

    const reorder = (list: any, startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragEnd = ({destination, source}: DropResult) => {
        if (!destination) return;
        const newItems = reorder(items, source.index, destination.index);
        // @ts-ignore
        setItems(newItems);
    };

    const useStyles = makeStyles({
        draggingListItem: {
            top: 'auto !important',
            left: 'auto !important'
        }
    });

    const classes = useStyles();


    useEffect(() => {
        setItems(tasks);
    }, [tasks]);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items ? items.map((t, i) => (
                                <Draggable key={t.id} draggableId={t.id} index={i}>
                                    {(provided, snapshot) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            // style={{width:330}}
                                            className={snapshot.isDragging ? classes.draggingListItem : ''}
                                        ><Task key={t.id}
                                               ToDoListID={toDoListID}
                                               task={t}/>
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))
                            : null
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableTasksList;