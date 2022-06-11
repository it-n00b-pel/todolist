import React, {useCallback, useEffect} from "react";
import "./App.css";
import AddItemForm from "./AddItemForm";
import {useAppDispatch, useAppSelector} from "./store/store";
import ToDoList from "./ToDoList";
import {Grid, Paper} from "@mui/material";
import {addNewToDoListTC, fetchToDoListsTC} from "./store/reducers/toDoListReducer";

function App() {
    console.log("APP")
    let toDoLists = useAppSelector(state => state.toDoLists);
    const dispatch  = useAppDispatch();

    useEffect(() => {
        dispatch(fetchToDoListsTC())
    }, [dispatch])


    const addNewToDoList = useCallback((title: string) => {
        // dispatch(AddNewToDoList(title))
        dispatch(addNewToDoListTC(title))

    }, [dispatch])

    return (

        <div className="App">
            <AddItemForm addItem={addNewToDoList}/>
            <Grid container spacing={3}>
                {toDoLists.map((t) => {
                    return <Grid item key={t.id}>
                        <Paper className={"todoPaper"} elevation={8}
                               style={{padding: "10px", backgroundColor: "InfoBackground"}
                               }>
                            <ToDoList toDoList={t} key={t.id} toDoListID={t.id}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>


        </div>
    );
}

export default App;
