export const ADD_TODOLIST = "TodoList/Reducer/ADD_TODOLIST"
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD_TASK"
export const CHANGE_TASK = "TodoList/Reducer/CHANGE_TASK"

const initialState = {
    todolists: [
        {title: "f0", id: 0, tasks: []},
        {title: "f1", id: 1, tasks: []},
        // {title: "f2", id: 2, tasks: []},
        // {title: "f3", id: 3, tasks: []},

    ]
}


export const reducer = (state = initialState, action) => {
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

            let arrTodoAfterDel = state.todolists.filter(todolist => todolist.id !== action.todolistId)
            arrTodoAfterDel = arrTodoAfterDel.map((todolist, i) => {
                return {...todolist, id: i}
            })
            return {
                ...state,
                todolists: arrTodoAfterDel
            }
        case DELETE_TASK:
            newTodolists = state.todolists.map(todo => {
                debugger
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    let arrTasksAfterDel = [...todo.tasks.filter(taska => taska.id !== action.taskId
                    )];
                    arrTasksAfterDel = arrTasksAfterDel.map((t, i) => {
                        return {...t, id: i}
                    })
                    return {
                        ...todo, tasks: arrTasksAfterDel
                    }
                }
            })
            return {...state, todolists: newTodolists}

    }
    return state;
}


export const addTodoListAC = (newTodolistName) => ({type: ADD_TODOLIST, newTodolistName: newTodolistName})

export const addTaskAC = (todolistId, newTask) => ({type: ADD_TASK, todolistId: todolistId, newTask: newTask})

export const changeTaskAC = (todolistId, taskId, newPropsObj) => {
    return (
        {
            type: CHANGE_TASK,
            todolistId: todolistId,
            taskId: taskId,
            newPropsObj: newPropsObj
        }
    )
}

export const deleteTodolistAC = (todolistId) => {
    return (
        {
            type: DELETE_TODOLIST,
            todolistId: todolistId
        }
    )
}

export const deleteTaskAC = (todolistId, taskId) => {
    return (
        {
            type: DELETE_TASK,
            todolistId: todolistId,
            taskId: taskId
        }
    )
}

// export const setStateFromLocalStorageAC=()=>{
//     localStorage
//     let dd=localStorage.getItem('dasdas')
//     let stateFromLS=JSON.parse(dd)
//     return (
//         {type: "SET-STATE-FROM-LOCAL-STORAGE",
//         stateFromLS:stateFromLS}
//     )
// }