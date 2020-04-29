import {createStore} from "redux";
import {ADD_TODOLIST} from "./App";
import {ADD_TASK, CHANGE_TASK, DELETE_TASK, DELETE_TODOLIST} from "./TodoList";


const initialState = {
    todolists: [
        {title: "f0", id: 0, tasks: []},
        {title: "f1", id: 1, tasks: []},
        // {title: "f2", id: 2, tasks: []},
        // {title: "f3", id: 3, tasks: []},

    ]
}


const reducer = (state = initialState, action) => {
    debugger
    let newTodolists;
    switch (action.type) {
        case ADD_TODOLIST:
            newTodolists = [...state.todolists, action.newTodolistName]
            return {...state, todolists: newTodolists}
        case ADD_TASK:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    return {...todo, tasks: [...todo.tasks, action.newTask]}
                }
            })
            return {...state, todolists: newTodolists}

        case CHANGE_TASK:
            newTodolists = state.todolists.map(todo => {
                if (todo.id !== action.todolistId) {
                    return todo
                } else {

                    return {
                        ...todo, tasks: [...todo.tasks.map(taska => {
                            if (taska.id !== action.taskId) {
                                return taska
                            } else {
                                return {...taska, ...action.newPropsObj}
                            }
                        })]
                    }
                }
            })
            debugger
            return {...state, todolists: newTodolists}
        case DELETE_TODOLIST:

            let v=state.todolists.filter(todolist => todolist.id !== action.todolistId)
            v=v.map((todolist, i)=>{
                return {...todolist, id: i}
            })
            return {
                ...state,
                todolists: v
            }
        case DELETE_TASK:
            newTodolists = state.todolists.map(todo => {
                debugger
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    let a=[...todo.tasks.filter(taska => taska.id !== action.taskId
                    )];
                    a = a.map((t, i) => {
                        return {...t, id: i}
                    })
                    return {
                        ...todo, tasks: a
                    }
                }
            })
            return {...state, todolists: newTodolists}

    }
    return state;
}
const store = createStore(reducer);

export default store;