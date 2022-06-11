import React, {memo, useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./store/store";
import {ToDoListStateType} from "./store/initialState/initialState";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {ChangeToDoListFilter} from "./store/actionCreators/actionCreatorsForToDoList";
import {EditableSpan} from "./EditableSpan";
import AddItemForm from "./AddItemForm";
import {AddNewTask} from "./store/actionCreators/actionCreatorsForTasks";
import {FilterType} from "./store/actions/ActionsForToDoList";
import s from "./ToDoListStyle.module.css"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {deleteToDoListTC, updateToDoList} from "./store/reducers/toDoListReducer";
import Task from "./Task";
import {fetchTasks} from "./store/reducers/tasksReducer";

export type ToDoListPropsType = {
    toDoListID: string
    toDoList: ToDoListStateType
}

export const ToDoList = memo(({toDoListID, toDoList}: ToDoListPropsType) => {
    console.log("TODOLIST")
    const dispatch = useAppDispatch();

    let tasksFromStore = useAppSelector(state => state.tasks[toDoListID]);

    useEffect(() => {
        dispatch(fetchTasks(toDoListID))
    }, [toDoListID, dispatch])
    const filterTasks = (filter: FilterType) => {
        // switch (filter) {
        //     case "active":
        //         return tasksFromStore.filter(t => !t.isDone)
        //     case "completed":
        //         return tasksFromStore.filter(t => t.isDone)
        //     default :
        return tasksFromStore
        // }
    }

    // const tasks = filterTasks(toDoList.filter)
    const tasks = tasksFromStore
    console.log(tasks)
    const changeFilterTypeToAll = useCallback(() => {
        dispatch(ChangeToDoListFilter(toDoListID, "all"))
    }, [toDoListID, dispatch])
    const changeFilterTypeToCompleted = useCallback(() => {
        dispatch(ChangeToDoListFilter(toDoListID, "completed"))
    }, [toDoListID, dispatch])
    const changeFilterTypeToActive = useCallback(() => {
        dispatch(ChangeToDoListFilter(toDoListID, "active"))
    }, [toDoListID, dispatch])

    const addTask = useCallback((title: string) => {
        dispatch(AddNewTask(toDoListID, title))
    }, [toDoListID, dispatch])

    const removeToDoList = useCallback(() => {
        dispatch(deleteToDoListTC(toDoListID))
    }, [toDoListID, dispatch])

    const changeToDoListTitle = useCallback((title: string) => {
        dispatch(updateToDoList(toDoListID, title))
    }, [toDoListID, dispatch])

    return (
        <div>
            <h2 className={s.toDoListTitle}>
                <EditableSpan value={toDoList.title}
                              onChange={changeToDoListTitle}/>

                <IconButton onClick={removeToDoList}>
                    <DeleteOutlineIcon className={s.deleteIcon}/>
                </IconButton>
            </h2>

            <div className={s.toDoListAddForm}>
                <AddItemForm
                    addItem={addTask}/>
            </div>
            <div>
                {tasks !== undefined ? tasks.map(t => {
                        return <Task key={t.id} ToDoListID={toDoListID} title={t.title}
                            // isDone={t.isDone}
                                     taskID={t.id}/>
                    })
                    : ""}
            </div>

            <ButtonGroup variant="contained" aria-label="outlined button group" style={{marginTop: "20px"}}>
                <Button color={"inherit"} onClick={changeFilterTypeToAll}>All</Button>
                <Button color={"success"} onClick={changeFilterTypeToCompleted}>Completed</Button>
                <Button color={"error"} onClick={changeFilterTypeToActive}>Active</Button>
            </ButtonGroup>
        </div>
    );
})

export default ToDoList;