export const ADD_TODOLIST = "TodoList/Reducer/ADD_TODOLIST"
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD_TASK"
export const CHANGE_TASK = "TodoList/Reducer/CHANGE_TASK"
export const SET_TODOLISTS = 'SET_TODOLISTS'
export const SET_TASKS = 'SET_TASKS'


const initialState = {
    todolists: [
        // {
        //     addedDate: "2020",
        //     id: "e75b1dca-1c11-4eb2-bca2-10cd270017a2",
        //     order: -4,
        //     title: "ewww",
        //     tasks: [{
        //         addedDate: "2020-05-14T19:55:29.983",
        //         deadline: null,
        //         description: null,
        //         id: "323d4c4b-873c-41bb-ab11-f9de8839454e",
        //         order: -2,
        //         priority: 2,
        //         startDate: null,
        //         status: 0,
        //         title: "dsdasdsa",
        //         todoListId: "b0e29d92-5cd1-4309-b781-12e4b257a44f"
        //     }]
        // }

    ]
}


export const reducer = (state = initialState, action) => {

    let newTodolists;
    switch (action.type) {

///////////////+++++++++
        case SET_TODOLISTS:
            // debugger
            return {...state, todolists: action.todolists}


        case ADD_TODOLIST:
            debugger

            newTodolists = [...state.todolists, action.newTodolistName]
            return {...state, todolists: newTodolists}

        case DELETE_TODOLIST:

            let arrTodoAfterDel = state.todolists.filter(todolist => todolist.id !== action.todolistId)
            arrTodoAfterDel = arrTodoAfterDel.map((todolist) => {
                return {...todolist}
            })
            return {
                ...state,
                todolists: arrTodoAfterDel
            }


///////////////////++++++++++
        case SET_TASKS:
            debugger
            let q = {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id != action.todoListId) {
                        return todo
                    } else {
                        return {...todo, tasks: action.tasks}
                    }
                })
            }
            console.log(q)
            return q;


///////////////////++++++++++
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
                if (todo.id !== action.task.todoListId) {
                    return todo
                } else {

                    return {
                        ...todo,
                        tasks: todo.tasks.map(taska => {
                            if (taska.id !== action.task.id) {
                                return taska
                            } else {
                                return {...action.task}
                            }
                        })
                    }
                }
            })
            debugger
            return {...state, todolists: newTodolists}


        case DELETE_TASK:
            newTodolists = state.todolists.map(todo => {
                debugger
                if (todo.id !== action.todolistId) {
                    return todo
                } else {
                    let arrTasksAfterDel = [...todo.tasks.filter(taska => taska.id !== action.taskId
                    )];
                    // arrTasksAfterDel = arrTasksAfterDel.map((t, i) => {
                    //     return {...t, id: i}
                    // })
                    return {
                        ...todo, tasks: arrTasksAfterDel
                    }
                }
            })
            return {...state, todolists: newTodolists}


        default:
            return state

    }
}


export const addTodoListAC = (newTodolistName) => ({type: ADD_TODOLIST, newTodolistName: newTodolistName})

export const addTaskAC = (todolistId, newTask) => ({type: ADD_TASK, todolistId: todolistId, newTask: newTask})

export const changeTaskAC = (task) => {
    return (
        {
            type: CHANGE_TASK,
            task: task
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


export const setTodoListsAC = (todolists) => {
    return (
        {
            type: SET_TODOLISTS,
            todolists
        }
    )
}

export const setTasksAC = (tasks, todoListId) => {
    return (
        {
            type: SET_TASKS,
            tasks,
            todoListId
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